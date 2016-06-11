<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\Stock;
use App\History;
use App\BoughtStock;
use App\ShortSell;
use App\User;
use App\Schedules;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        // Commands\Inspire::class,
        Commands\DayStartUpdate::class,
        Commands\DayEndUpdate::class,
        Commands\StockUpdate::class,
        Commands\ValueUpdate::class,
        Commands\WeekUpdate::class,
        Commands\InitStocks::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

      $schedule->call(function () {
        //run this daily: At the start of each day before market opens


      })->everyMinute();


    }



}
