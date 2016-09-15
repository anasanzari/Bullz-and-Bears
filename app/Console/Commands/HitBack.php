<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class HitBack extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hitback:now';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To hit the server which is running cronjobs. Too bad hostgator allows only 15minute crons.';

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
        $res = @file_get_contents("https://bnbhit-meltdown.rhcloud.com");
        $this->info('Fetch Complete:');
        $this->info($res);
    }
}
