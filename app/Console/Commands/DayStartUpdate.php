<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Schedules;
use DB;

class DayStartUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:daystart';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To be run at the start of every day.';

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
      //User::update(DB::raw('dayworth = liquidcash + marketvalue')); some static error!.
      DB::table('users')->update(['dayworth' => DB::raw("liquidcash + marketvalue")]);
      Schedules::where('pend_no_shares',0)->delete();
    }
}
