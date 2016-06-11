<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\User;
use App\History;
use App\ShortSell;
use DB;


class DayEndUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:dayend';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update to be run at end of each day';

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
      DB::statement('insert into history (playerid, transaction_type, symbol, amount, value) SELECT playerid,\''.History::TYPE_COVER.'\', symbol, amount, avg FROM short_sell');
      DB::statement("create TEMPORARY TABLE ShortSell (id VARCHAR(15) NOT NULL, value DECIMAL(15, 2) NOT NULL DEFAULT 0) ENGINE=MEMORY");
      DB::statement("insert INTO ShortSell (SELECT playerid, SUM(value * 0.998 * amount - avg * amount) as S FROM short_sell LEFT JOIN stocks ON short_sell.symbol = stocks.symbol)");
      DB::statement("update users, ShortSell SET users.liquidcash = users.liquidcash + ShortSell.value, shortval = 0 WHERE users.id = ShortSell.id");
      DB::statement("delete FROM short_sell WHERE 1");
    }
}
