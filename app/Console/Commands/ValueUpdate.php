<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\User;
use App\Schedules;
use App\History;
use App\Transaction;
use App\BoughtStock;
use App\ShortSell;
use DB;

use Carbon\Carbon;

class ValueUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:values';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To be run very often after stockupdate.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(){
      //not very pretty!!

      //time check
      $now = Carbon::now('Asia/Calcutta');
      if($now->dayOfWeek==6||$now->dayOfWeek==0){ //sat or sun. Need to figure out public holiday check!!!
          $this->info('Market is Closed');
          return;
      }
      $start = Carbon::now('Asia/Calcutta');
      $start->hour = 9;
      $start->minute = 15;
      $end = Carbon::now('Asia/Calcutta');
      $end->hour = 15;
      $end->minute = 30;

      if(!$now->between($start,$end)){
          $this->info('Market is Closed');
          return;
      }



      DB::statement("CREATE TEMPORARY TABLE ScheduleProc (id VARCHAR(15) NOT NULL, p_liqcash INT NOT NULL DEFAULT 0, p_mval INT NOT NULL DEFAULT 0, p_sval INT NOT NULL DEFAULT 0, amount INT NOT NULL DEFAULT 0,  symbol VARCHAR(12) NOT NULL, skey BIGINT DEFAULT 0, type VARCHAR(15), value INT, bought_amount INT NOT NULL DEFAULT 0, shorted_amount INT NOT NULL DEFAULT 0) ENGINE=MEMORY;");
      DB::statement("INSERT INTO ScheduleProc (SELECT playerid, 0, 0, 0, pend_no_shares, schedules.symbol, schedules.id, transaction_type, stocks.value, 0, 0 FROM schedules JOIN stocks ON schedules.symbol = stocks.symbol AND ( (schedules.flag = 'low' AND schedules.scheduled_price >= stocks.value) OR (schedules.flag = 'high' AND schedules.scheduled_price <= stocks.value) ))");
      DB::statement("UPDATE ScheduleProc, (SELECT id, liquidcash, marketvalue, shortval FROM users) P SET p_liqcash = P.liquidcash, p_mval = P.marketvalue, p_sval = P.shortval WHERE P.id = ScheduleProc.id");
      DB::statement("UPDATE ScheduleProc SET bought_amount = (SELECT amount FROM bought_stocks WHERE bought_stocks.playerid = ScheduleProc.id AND bought_stocks.symbol = ScheduleProc.symbol)");
      DB::statement("UPDATE ScheduleProc SET shorted_amount = (SELECT amount FROM short_sell WHERE short_sell.playerid = ScheduleProc.id AND short_sell.symbol = ScheduleProc.symbol)");
      DB::statement("DELETE FROM ScheduleProc WHERE amount <= 0");

      $schedules = DB::table('ScheduleProc')->get();
      $this->info('Need to Handle : '.sizeof($schedules));

      $users = User::whereRaw('id IN (SELECT DISTINCT(id) FROM ScheduleProc)')->get();
      foreach ($users as $user) {
        $Players[$user->id] = ["user" => $user];
      }


      $bstocks = BoughtStock::whereRaw("playerid IN (SELECT DISTINCT(id) FROM ScheduleProc)")->get();
      foreach ($bstocks as $bstock) {
        $Players[$bstock->playerid][$bstock->symbol]['bought'] = $bstock->amount;
      }

      $shortsells = ShortSell::whereRaw("playerid IN (SELECT DISTINCT(id) FROM ScheduleProc)")->get();
      foreach ($shortsells as $short) {
        $Players[$short->playerid][$short->symbol]['shorted'] = $short->amount;
        $Players[$short->playerid][$short->symbol]['shorted_avg'] = $short->avg;
      }

      if(sizeof($schedules)==0){
         return;
      }


  		foreach ($schedules as &$Schedule) {

        $this->info('Handling the schedule : '.$Schedule->skey);

        $sid = $Schedule->id; //playerid
        $sym = $Schedule->symbol;

  			$Players[$sid][$sym]['bought'] = (isset($Players[$sid][$sym]['bought'])) ? $Players[$sid][$sym]['bought'] : 0;
  			$Players[$sid][$sym]['shorted'] = (isset($Players[$sid][$sym]['shorted'])) ? $Players[$sid][$sym]['shorted'] : 0;
  			$Players[$sid][$sym]['shorted_avg'] = (isset($Players[$sid][$sym]['shorted_avg'])) ? $Players[$sid][$sym]['shorted_avg'] : 0;

        $array = array( 'value' => $Schedule->value,
                        'bought_amount' => $Players[$sid][$sym]['bought'],
                        'shorted_amount' => $Players[$sid][$sym]['shorted']);

        switch ($Schedule->type) {
  				case History::TYPE_BUY:
  					$amount = Transaction::getMaxBuyAmount($Players[$sid]['user'],$Schedule->value,$Players[$sid][$sym]['bought']);
            $amount = max(min($Schedule->amount, $amount), 0);
  					if ($amount && Transaction::Buy($Players[$sid]['user'], $sym, $amount, $array, $Schedule->skey)) {
  						$Players[$sid][$sym]['bought'] += $amount;
  					}
  				break;
  				case History::TYPE_SELL:
  					$amount = max(min($Schedule->amount, $Players[$sid][$sym]['bought']), 0);
  					if ($amount && Transaction::Sell($Players[$sid]['user'], $sym, $amount, $array, $Schedule->skey)) {
  						$Players[$sid][$sym]['bought'] -= $amount;
  					}
  				break;
  				case History::TYPE_SHORT_SELL:
            $amount = Transaction::getMaxShortAmount($Players[$sid]['user'],$Schedule->value, $Players[$sid][$sym]['shorted']);
  					$amount = max(min($Schedule->amount, $amount), 0);
  					if ($amount && Transaction::Short($Players[$sid]['user'], $sym, $amount, $array, $Schedule->skey)) {
  						$Players[$sid][$sym]['shorted'] += $amount;
  					}
  				break;
  				case History::TYPE_COVER:
  					$amount = max(min($Schedule->amount, $Players[$sid][$sym]['shorted']), 0);
  					if ($amount && Transaction::Cover($Players[$sid]['user'], $sym, $amount, $array, $Schedule->skey)) {
  						$Players[$sid][$sym]['shorted'] -= $amount;
  					}
  				break;
  			}
      }
      //end forloop

      $this->info('Done with Schedules.');
      $this->info("Updating Market Values.");

      DB::transaction(function(){
        DB::statement("CREATE TEMPORARY TABLE MarketVal (id VARCHAR(15) NOT NULL, b_amount INT NOT NULL DEFAULT 0,  ss_amount INT NOT NULL DEFAULT 0, ss_value DECIMAL(15, 2) NOT NULL DEFAULT 0, value INT) ENGINE=MEMORY;");
        DB::statement("INSERT INTO MarketVal (SELECT b.playerid as ID, IFNULL((b.amount), 0) AS b_amount, IFNULL((ss.amount), 0), IFNULL((ss.avg), 0) AS ss_value, s.value ".
             "FROM short_sell AS ss RIGHT JOIN bought_stocks AS b ON b.symbol = ss.symbol AND b.playerid = ss.playerid LEFT JOIN stocks AS s ON s.symbol = b.symbol)".
             "UNION (SELECT ss.playerid as ID, IFNULL((b.amount), 0) AS b_amount, IFNULL((ss.amount), 0), IFNULL((ss.avg), 0) AS ss_value, s.value ".
             "FROM short_sell AS ss LEFT JOIN bought_stocks AS b ON ss.symbol = b.symbol AND ss.playerid = b.playerid LEFT JOIN stocks AS s ON s.symbol = ss.symbol)");
        DB::statement("UPDATE users SET marketValue = (SELECT SUM(MarketVal.b_amount * MarketVal.value) + SUM(MarketVal.ss_amount * (MarketVal.ss_value - MarketVal.value)) from MarketVal WHERE MarketVal.id = users.id) WHERE rank = 1");

      });

      $this->info("Market Values Updated.");
    }
}
