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
        Commands\InitStocks::class,
        Commands\HitBack::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $timezone = 'Asia/Calcutta';

        $schedule->command('update:stocks')->everyMinute()->timezone($timezone);
        $schedule->command('update:daystart')->dailyAt('9:00')->timezone($timezone);
        $schedule->command('update:dayend')->dailyAt('16:00')->timezone($timezone);
        $schedule->command('update:weekly')->weekly()->fridays()->at('16:00')->timezone($timezone);

        $schedule->command('hitback:now')->hourly()->timezone($timezone);;
    }



}
