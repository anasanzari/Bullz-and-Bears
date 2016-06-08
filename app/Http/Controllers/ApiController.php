<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

use App\Http\Requests;
use App\Stock;
use App\History;
use App\BoughtStock;
use App\ShortSell;
use App\User;
use App\Schedules;

use Carbon\Carbon;
use Validator;


class ApiController extends Controller
{
  public function __construct()
  {
      // Apply the jwt.auth middleware to all methods in this controller
      // except for the authenticate method. We don't want to prevent
      // the user from retrieving their token if they don't already have it
    //  $this->middleware('jwt.auth', ['except' => ['authenticate']]);

    date_default_timezone_set('Asia/Calcutta');
    setlocale(LC_MONETARY, 'en_IN');

  }

  public function getStocks(){

    //get authenticated user
    $user = User::find(1);
    return $this->stocks($user);
  }

  private function stocks($user){

    $liqCash = $user->liquidcash;
    $shortVal = $user->shortval;
    $marketVal = $user->marketvalue;

    $stocks = Stock::leftJoin('bought_stocks',
                    function ($join) use ($user) {
                      $join->on('bought_stocks.symbol', '=', 'stocks.symbol')
                           ->where('bought_stocks.playerid', '=', $user->id);
                    })
                   ->leftJoin('short_sell',
                     function ($join) use ($user) {
                        $join->on('short_sell.symbol', '=', 'stocks.symbol')
                             ->where('short_sell.playerid', '=', $user->id);
                     })
                   ->select('stocks.*', 'bought_stocks.amount as bought_amount',
                            'short_sell.amount as shorted_amount')
                   ->get();

    foreach ($stocks as $key => $value) {


      $val1 = floor(($liqCash- ($shortVal / 4)) / (1.002 * $value->value));
      $val2 = floor(($liqCash + $marketVal) / (6 * 1.002* $value->value)) - $value->bought_amount;

      $stocks[$key]->max_buy = max(min($val1, $val2),0);

      $val3 = floor( ((4 * $liqCash ) - $shortVal ) / ( $value->value * 1.004 ) );
      $val4 = floor( ($liqCash + $marketVal - $shortVal )/ (6* $value->value * 1.004) ) - $value->shorted_amount;

      $stocks[$key]->max_short = max(min($val3, $val4 ), 0);

    }

    return $stocks;
  }

  public function getPlayer(Request $request){
    $user = User::find(1);
    $user->setDetails();
    return $user;
  }

  //return user's stocks.
  public function getBought(Request $request){

    $user = User::find(1); //get authenticated user.

    $stocks = BoughtStock::join('stocks',
                    function ($join) use ($user) {
                      $join->on('bought_stocks.symbol', '=', 'stocks.symbol')
                           ->where('bought_stocks.playerid', '=', $user->id);
                    })->get();

    foreach ($stocks as $key => $value) {

      $stocks[$key]->invested_value = number_format($value->avg * $value->amount , 2, '.', '');
      $stocks[$key]->present_value = number_format($value->value * $value->amount, 2, '.', '');
      $stocks[$key]->brokerage = number_format($value->avg * $value->amount  * 0.002, 2, '.', '');
      $stocks[$key]->gain = number_format((($value->value * 0.998) - ($value->avg * 1.002)) * $value->amount, 2, '.', '');

    }

    return $stocks;

  }

  //return user's shorts.
  public function getShorted(Request $request){

    $user = User::find(1); //get authenticated user.

    $stocks = ShortSell::join('stocks',
                    function ($join) use ($user) {
                      $join->on('short_sell.symbol', '=', 'stocks.symbol')
                           ->where('short_sell.playerid', '=', $user->id);
                    })->get();

    foreach ($stocks as $key => $value) {

      $stocks[$key]->sold_value = number_format($value->avg * $value->amount , 2, '.', '');
      $stocks[$key]->brokerage = number_format($value->avg * $value->amount  * 0.002, 2, '.', '');
      $stocks[$key]->gain = number_format((($value->value * 0.998) - ($value->avg * 1.002)) * $value->amount, 2, '.', '');

    }

    return $stocks;

  }

  public function getHistory(Request $request){

    $user = User::find(1); //get authenticated user.
    $transactions = History::where('playerid',$user->id)->orderBy('transaction_time', 'DESC')->paginate();

    foreach ($transactions as $key => $value) {

      //$transactions[$key]->transaction_time =  ISO860 format
      $amount = $value->amount;
      $value = $value->value;
      $transactions[$key]->total = number_format($value*$amount, 2, '.', '');
      $transactions[$key]->brokerage = number_format(0.002*$value*$amount, 2, '.', '');

    }

    return $transactions;
  }

  public function getDailyRankings(Request $request){

    $users = User::selectRaw('id, fbid, name, marketvalue + liquidcash - dayworth as total')->
                   where('rank','<>',0)->orderBy('total','DESC')->paginate();

    return $users;


  }

  public function getWeeklyRankings(Request $request){
    $users = User::selectRaw('id, fbid, name, marketvalue + liquidcash - weekworth as total')->
                   where('rank','<>',0)->orderBy('total','DESC')->paginate();

    return $users;
  }

  public function getOverallRankings(Request $request){
    $users = User::selectRaw('id, fbid, name, marketvalue + liquidcash as total')->
                   where('rank','<>',0)->orderBy('total','DESC')->paginate();

    return $users;
  }

  public function getScheduled(Request $request){
    $user = User::find(1); //get authenticated user.

    return $this->schedules($user);
  }



  public function cancelSchedule(Request $request){
    $user = User::find(1); //get authenticated user.
    $values = $request->all();
    $skey = $values['skey'];
    Schedules::where('playerid',$user->id)
                ->where('skey',$skey)->delete();
    return $this->schedules($user);
  }

  public function doTrade(Request $request){

    $user = User::find(1); //get authenticated user.
    $data = $request->all();
    $validator = Validator::make($request->all(), [
			'type' => 'required|in:'.implode(History::TYPES,","),
			'symbol' => 'required',
			'amount' => 'required|numeric'
		]);
		if ($validator->fails()) {
					 return response()->json(['errors' => $validator->errors()->all()], 400);
		}


    $type = $data['type'];
    $symbol = $data['symbol'];
    $amount = $data['amount'];

    $max_amount = 0;

    $stocks = $this->stockForTransaction($user,$symbol);

    if(sizeof($stocks)==1){
      $stock = $stocks->first();
      switch ($type) {
        case History::TYPE_BUY:
          $floor1 = floor( ($user->liquidcash - ($user->shortval / 4) ) / (1.002 * $stock->value ) );
          $floor2 = floor( ($user->liquidcash + $user->market_value) / (6*1.002*$stock->value) );
          $max_amount = max(min($floor1, $floor2 - $stock->bought_amount), 0);
          break;
        case History::TYPE_SELL:
          $max_amount = $stock->bought_amount;
          break;
        case History::TYPE_SHORT_SELL:
          $floor1 = floor( ((4 * $user->liquidcash ) - $user->shortval ) / ( $stock->value*1.004 ) );
          $floor2 = floor( ($user->liquidcash + $user->marketvalue - $user->shortval ) / (6*$stock->value*1.004) );
          $max_amount = max(min($floor1, $floor2 - $stock->shorted_amount), 0);
          break;
        case History::TYPE_COVER:
          $max_amount = $stock->shorted_amount;
          break;
      }

      if($amount>$max_amount){
        return response()->json(['errors' => ["Amount is too much. Try a lower value."]], 400);
      }else if($amount<1){
        return response()->json(['errors' => ["Positive amount required."]], 400);
      }

      //actual trade!!!
      $db = [];

      switch($type){
          case History::TYPE_BUY :  $r = $this->Buy($user, $symbol, $amount, $stock, NULL);break;
          case History::TYPE_SELL: $r = $this->Sell($user, $symbol, $amount, $stock, NULL);break;
          case History::TYPE_SHORT_SELL: $r = $this->Short($user, $symbol, $amount, $stock, NULL);break;
          case History::TYPE_COVER : $r = $this->Cover($user, $symbol, $amount, $stock, NULL);break;
      }

      if($r){
        return $this->stocks($user);
      }else{
        return response()->json(['errors' => ['Transaction failed.']], 500);
      }
    }else{
      return response()->json(['errors' => ['unknown error']], 500);
    }

}

  public function stockForTransaction($user,$symbol){
    $stocks = Stock::leftJoin('bought_stocks',
                    function ($join) use ($user) {
                      $join->on('bought_stocks.symbol', '=', 'stocks.symbol')
                           ->where('bought_stocks.playerid', '=', $user->id);
                    })
                   ->leftJoin('short_sell',
                     function ($join) use ($user) {
                        $join->on('short_sell.symbol', '=', 'stocks.symbol')
                             ->where('short_sell.playerid', '=', $user->id);
                     })
                   ->select('stocks.*', 'bought_stocks.amount as bought_amount',
                            'short_sell.amount as shorted_amount')
                   ->whereRaw("stocks.symbol = '$symbol'")
                   ->orderBy('name','ASC')->get();
      return $stocks;
  }


  public function doSchedule(Request $request){

    $user = User::find(1); //get authenticated user.
    $data = $request->all();
    $validator = Validator::make($request->all(), [
			'type' => 'required|in:'.implode(History::TYPES,","),
			'symbol' => 'required',
			'amount' => 'required|numeric',
      'scheduledPrice' => 'required|numeric'
		]);
		if ($validator->fails()) {
					 return response()->json(['errors' => $validator->errors()->all()], 400);
		}

    $type = $data['type'];
    $symbol = $data['symbol'];
    $amount = $data['amount'];
    $scheduledPrice = $data['scheduledPrice'];

    $stocks = $this->stockForTransaction($user,$symbol);

    if(sizeof($stocks)==1){
      $stock = $stocks->first();
      $max_amount = floor( ($user->liquidcash + $user->marketvalue) / (6 * 1.002 * $stock->value) );
      $flag = $scheduledPrice <= $stock->value ? Schedules::TYPE_LOW : Schedules::TYPE_HIGH;

      if($amount>$max_amount){
        return response()->json(['errors' => ["Amount is too much. Try a lower value."]], 400);
      }else if($amount<1){
        return response()->json(['errors' => ["Positive amount required."]], 400);
      }

      $schedule = Schedules::create([
        'playerid' => $user->id,
        'symbol' => $symbol,
        'transaction_type' => $type,
        'scheduled_price' => $scheduledPrice,
        'no_shares' => $amount,
        'pend_no_shares' => $amount,
        'flag' => $flag
      ]);

      return $schedule;

    }else{
      return response()->json(['errors' => ['unknown error']], 500);
    }

  }


  private function schedules($user){
    $schedules = schedules::join('stocks',
                    function ($join) use ($user) {
                      $join->on('schedules.symbol', '=', 'stocks.symbol')
                           ->where('schedules.playerid', '=', $user->id);
                    })->orderBy('skey','ASC')->get();
    return $schedules;
  }

  private function Buy($user, $symbol, $amount, $stock_data, $skey) {
    try{
        DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
          BoughtStock::buyUpdate($user, $symbol, $amount,$stock_data['value']);
          History::create([
            'playerid' => $user->id,
            'symbol' => $symbol,
            'transaction_type' => History::TYPE_BUY,
            'amount' => $amount,
            'value' => $stock_data['value'],
            'skey' => $skey,
            'transaction_time' => Carbon::now(),
            'p_marketvalue' => $user->marketvalue,
            'p_liquidcash' => $user->liquidcash
          ]);
          $user->buyUpdate($amount, $stock_data['value']);

          if ($skey != null){ //make it null
              Schedules::updateShares($amount, $skey);
          }
        });
        return true;
    }catch(Exception $e){
        return false;
    }

	}


	private function Sell($user, $symbol, $amount, $stock_data, $skey) {

    try{
        DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
          BoughtStock::sellUpdate($user, $symbol, $amount,$stock_data);
          History::create([
            'playerid' => $user->id,
            'symbol' => $symbol,
            'transaction_type' => History::TYPE_SELL,
            'amount' => $amount,
            'value' => $stock_data['value'],
            'skey' => $skey,
            'transaction_time' => Carbon::now(),
            'p_marketvalue' => $user->marketvalue,
            'p_liquidcash' => $user->liquidcash
          ]);
          $user->sellUpdate($amount, $stock_data['value']);

          if ($skey != null){ //make it null
              Schedules::updateShares($amount, $skey);
          }
        });
        return true;
    }catch(Exception $e){
        return false;
    }
	}

	private function Short($user, $symbol, $amount, $stock_data, $skey) {

    try{
        DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
          ShortSell::shortUpdate($user, $symbol, $amount,$stock_data['value']);
          History::create([
            'playerid' => $user->id,
            'symbol' => $symbol,
            'transaction_type' => History::TYPE_SHORT_SELL,
            'amount' => $amount,
            'value' => $stock_data['value'],
            'skey' => $skey,
            'transaction_time' => Carbon::now(),
            'p_marketvalue' => $user->marketvalue,
            'p_liquidcash' => $user->liquidcash
          ]);
          $user->shortUpdate($amount, $stock_data['value']);

          if ($skey != null){
              Schedules::updateShares($amount, $skey);
          }
        });
        return true;
    }catch(Exception $e){
        return false;
    }

	}

	private function Cover($user, $symbol, $amount, $stock_data, $skey) {

    try{
        DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
          //extra db call!
          $short = ShortSell::where('playerid', $user->id)
                                ->where('symbol', $symbol)
                                ->first();
          $oldaverage = $short->avg;

          ShortSell::coverUpdate($user, $symbol, $amount,$stock_data);
          History::create([
            'playerid' => $user->id,
            'symbol' => $symbol,
            'transaction_type' => History::TYPE_COVER,
            'amount' => $amount,
            'value' => $stock_data['value'],
            'skey' => $skey,
            'transaction_time' => Carbon::now(),
            'p_marketvalue' => $user->marketvalue,
            'p_liquidcash' => $user->liquidcash
          ]);
          $user->coverUpdate($amount, $stock_data['value'], $oldaverage);

          if ($skey != null){
              Schedules::updateShares($amount, $skey);
          }

        });
        return true;
    }catch(Exception $e){
        return false;
    }

	}





}
