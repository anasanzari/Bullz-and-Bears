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
use Carbon\Carbon;

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
        Commands\HitBack::class,
        Commands\Simulate::class,
        Commands\Rollback::class
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
        $now = Carbon::now($timezone);
        $end = Carbon::createFromFormat(Carbon::ISO8601, config('bullz.game_end_timestamp'));
        if($now->gt($end)){
            return; // Game Ended.
        }

        $schedule->command('update:stocks')->everyMinute()->timezone($timezone);
        $schedule->command('update:daystart')->dailyAt('9:00')->timezone($timezone);
        $schedule->command('update:dayend')->dailyAt('16:00')->timezone($timezone);
        //!update on mondays
        $schedule->command('update:weekly')->weekly()->mondays()->at('9:00')->timezone($timezone);

        $schedule->command('hitback:now')->hourly()->timezone($timezone);;
    }



}
