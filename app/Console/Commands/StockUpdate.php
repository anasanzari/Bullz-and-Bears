<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Stock;
use Artisan;
use Carbon\Carbon;


class StockUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:stocks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To be run very often (minutely).';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private function curl_get_contents($url){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        $json = curl_exec($ch);
        curl_close($ch);
        return $json;

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(){

        $res = $this->curl_get_contents("https://nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json");
        $jsonobj = json_decode($res);
        $this->info('Fetch Complete: Time Stamp : '.$jsonobj->time);
        $update_time = date('Y-m-d H:i:s', strtotime($jsonobj->time));

        foreach($jsonobj->{'data'} as $data){

    		    if(str_replace(",", "",$data->ltP)!=0){
                $this->info("Updating ".$data->symbol);
                Stock::where('symbol',$data->symbol)
                    ->update([
                      'time_stamp' => $update_time,
                      'value' => str_replace(",","",$data->ltP),
                      'change' => str_replace(",","",$data->ptsC),
                      'daylow' => str_replace(",","",$data->low),
                      'dayhigh' => str_replace(",","",$data->high),
                      'weeklow' => str_replace(",","",$data->wklo),
                      'weekhigh'=> str_replace(",","",$data->wkhi),
                      'change_perc' => str_replace(",","",$data->per)
                ]);
    		    }
    	 }
         $exitCode = Artisan::call('update:values', []);
    }
}
