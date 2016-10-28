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

class Rollback extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rollback:till {time}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rollback to a previous timestamp.';

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
        $time = $this->argument('time');
        $this->info($time);
        $rollops = History::where('transaction_time','>=',$time)->orderBy('transaction_time','desc')->get();
        foreach ($rollops as $op) {
            $this->info('Reverting '.$op->transaction_type.' by '.$op->playerid.' at '.$op->transaction_time);
            $this->info('Symbol: '.$op->symbol.' Amount: '.$op->amount.' Value: '.$op->value);
            $user = User::find($op->playerid);
            switch ($op->transaction_type) {
                case History::TYPE_BUY:
                    BoughtStock::buyRevert($op->playerid, $op->symbol, $op->amount,$op->value);
                    $user->buyRevert($op->amount, $op->value);

                    break;
                case History::TYPE_SELL:

                    BoughtStock::sellRevert($op->playerid, $op->symbol, $op->amount,$op->value);
                    $user->sellRevert($op->amount, $op->value);

                    break;
                case History::TYPE_SHORT_SELL:

                    ShortSell::shortRevert($op->playerid, $op->symbol, $op->amount,$op->value);
                    $user->shortRevert($op->amount, $op->value);


                    break;
                case History::TYPE_COVER:

                    $short = ShortSell::coverRevert($op->playerid, $op->symbol, $op->amount,$op->value);
                    $oldaverage = $short->avg;
                    $user->coverRevert($op->amount, $op->value, $oldaverage);

                    break;

            }

            if ($op->skey != null){
                Schedules::updateSharesRevert($op->amount, $op->skey);
            }
            $op->delete();

        }
    }
}
