<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Carbon\Carbon;

class FinanceApiController extends Controller
{

    // Finance Apis.

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
      //  $this->middleware('jwt.auth', ['except' => ['authenticate']]);

      date_default_timezone_set('Asia/Calcutta');
      setlocale(LC_MONETARY, 'en_IN');

    }

    private function createUrl($query)
    {
       $params = array(
           'env' => "http://datatables.org/alltables.env",
           'format' => "json",
           'q' => $query,
       );
       return "http://query.yahooapis.com/v1/public/yql?".http_build_query($params);
    }

    public function symbol($symbol){
        $symbol = $symbol.".NS";
        return $this->getValues($symbol);
    }

    public function overall()
    {
        $symbol = '^NSEI';
        return $this->getValues($symbol);

    }
    private function getValues($symbol){

        $end = Carbon::now()->toDateString();
        $start = Carbon::now()->subMonth()->toDateString();

        $query = "select * from yahoo.finance.historicaldata where startDate='"
                .$start."' and endDate='"
                .$end."' and symbol='".$symbol."'";

        $url = $this->createUrl($query);

        $res = @file_get_contents($url);
        $data = json_decode($res,TRUE);

        $out = [];
        $quotes = $data['query']['results']['quote'];
        $qlen = sizeof($quotes);
        for($k=$qlen-1;$k>=0;$k--){
            $out['open'][] = $quotes[$k]['Open'];
            $out['high'][] = $quotes[$k]['High'];
            $out['low'][] = $quotes[$k]['Low'];
            $out['dates'][] = Carbon::createFromFormat('Y-m-d', $quotes[$k]['Date'])->format('M-d');
        }

        if(sizeof($out)==0){
            return response()->json(['error' => 'Not available.'], 500);
        }

        return $out;
    }


}
