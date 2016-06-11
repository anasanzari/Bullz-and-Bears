<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\User;
use App\History;
use App\ShortSell;
use App\Schedules;
use DB;

class WeekUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:weekly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To be run at start of every week.';

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
      //$this-info("freaky error");
      DB::statement("UPDATE users SET weekworth = liquidcash + marketvalue");
      Schedules::where("pend_no_shares","0")->delete();

    }
}
