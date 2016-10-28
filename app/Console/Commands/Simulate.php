<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use DB;

use App\Stock;
use App\History;
use App\BoughtStock;
use App\ShortSell;
use App\User;
use App\Schedules;

use Carbon\Carbon;

use App\Transaction;
use Auth;
use Artisan;

class Simulate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'simulate:game';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Simulate the game from begining.';

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
    public function handle()
    {


      $this->info("Simulating Game..");

      

     /* DB::transaction(function(){

        $start_money = config('bullz.start_money');
        $brokerage = 0.002;
        DB::statement("DELETE FROM `bought_stocks` WHERE 1");
        DB::statement("DELETE FROM `short_sell` WHERE 1");
    	DB::statement("UPDATE `users` SET liquidcash = '{$start_money}', marketvalue = 0;");
    	DB::statement("UPDATE `users` SET liquidcash = liquidcash -  COALESCE((SELECT SUM(ROUND(amount * value * (1 + $brokerage),2)) FROM history WHERE history.playerid = users.id and transaction_type = 'Buy' GROUP BY history.playerid), 0)");
        DB::statement("UPDATE `users` SET liquidcash = liquidcash + COALESCE((SELECT SUM(ROUND(amount * value * (1 - $brokerage),2)) FROM history WHERE history.playerid = users.id and transaction_type = 'Sell' GROUP BY history.playerid),0)");
    	DB::statement("UPDATE `users` SET liquidcash = liquidcash - COALESCE((SELECT SUM(ROUND(amount * value * $brokerage,2)) FROM history WHERE history.playerid = users.id and (transaction_type = 'Cover' OR transaction_type = 'Short Sell') GROUP BY history.playerid),0)");


        DB::statement("INSERT INTO bought_stocks (SELECT playerid, symbol, SUM(amount) as amt, (SUM(ROUND(amount * value,2)) / SUM(amount)) as avg FROM history WHERE transaction_type = 'Buy' GROUP BY playerid, symbol)");
        DB::statement("UPDATE bought_stocks dest, (SELECT playerid, symbol, SUM(amount) as amt, (SUM(ROUND(amount * value,2)) / SUM(amount)) as avg FROM history WHERE transaction_type = 'Sell' GROUP BY playerid, symbol) src SET dest.amount = dest.amount - src.amt, dest.avg = (dest.amount * dest.avg - src.amt * src.avg) / (dest.amount - src.amt) WHERE dest.playerid = src.playerid AND dest.symbol = src.symbol") ;
        DB::statement("INSERT INTO short_sell (SELECT playerid, symbol, SUM(amount) as amt, (SUM(ROUND(amount * value,2)) / SUM(amount)) as avg FROM history WHERE transaction_type = 'Short Sell' GROUP BY playerid, symbol)");

        DB::statement("UPDATE users dest, (SELECT playerid, symbol, SUM(amount) as amt, (SUM(ROUND(amount * value,2)) / SUM(amount)) as avg FROM history WHERE transaction_type = 'Cover' GROUP BY playerid, symbol) src, short_sell srcb SET dest.liquidcash = dest.liquidcash + ROUND((src.avg - srcb.avg) * src.amt,2) WHERE dest.id = src.playerid AND src.symbol = srcb.symbol AND src.playerid = srcb.playerid") ;

        DB::statement("UPDATE short_sell dest, (SELECT playerid, symbol, SUM(amount) as amt, (SUM(ROUND(amount * value,2)) / SUM(amount)) as avg FROM history WHERE transaction_type = 'Cover' GROUP BY playerid, symbol) src SET dest.amount = dest.amount - src.amt, dest.avg = (dest.amount * dest.avg - src.amt * src.avg) / (dest.amount - src.amt) WHERE dest.playerid = src.playerid AND dest.symbol = src.symbol") ;
        DB::statement("DELETE FROM `bought_stocks` WHERE amount = 0") ;
    	DB::statement("DELETE FROM `short_sell` WHERE amount = 0") ;
    	DB::statement("UPDATE `users` SET shortval = (SELECT SUM(amount * avg) FROM short_sell WHERE short_sell.playerid = users.id GROUP BY short_sell.playerid)") ;
    	DB::statement("CREATE TEMPORARY TABLE MarketVal (id VARCHAR(15) NOT NULL, b_amount INT NOT NULL DEFAULT 0,  ss_amount INT NOT NULL DEFAULT 0, ss_value DECIMAL(15, 2) NOT NULL DEFAULT 0, value INT) ENGINE=MEMORY;") ;
    	DB::statement("INSERT INTO MarketVal (SELECT b.playerid as ID, IFNULL((b.amount), 0) AS b_amount, IFNULL((ss.amount), 0), IFNULL((ss.avg), 0) AS ss_value, s.value FROM short_sell AS ss RIGHT JOIN bought_stocks AS b ON b.symbol = ss.symbol AND b.playerid = ss.playerid LEFT JOIN stocks AS s ON s.symbol = b.symbol) UNION (SELECT ss.playerid as ID, IFNULL((b.amount), 0) AS b_amount, IFNULL((ss.amount), 0), IFNULL((ss.avg), 0) AS ss_value, s.value FROM short_sell AS ss LEFT JOIN bought_stocks AS b ON ss.symbol = b.symbol AND ss.playerid = b.playerid LEFT JOIN stocks AS s ON s.symbol = ss.symbol)") ;
    	DB::statement("UPDATE users SET marketvalue = (SELECT SUM(MarketVal.b_amount * MarketVal.value) + SUM(MarketVal.ss_amount * (MarketVal.ss_value - MarketVal.value)) from MarketVal WHERE MarketVal.id = users.id) WHERE rank = 1") ;

                //$this->info("-->debug.");
      });*/

      $this->info("Simulation Complete.");


    }
}
