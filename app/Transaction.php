<?php

namespace App;

use App\Http\Requests;
use App\Stock;
use App\History;
use App\BoughtStock;
use App\ShortSell;
use App\User;
use App\Schedules;

use DB;

use Carbon\Carbon;
use Validator;

class Transaction{
    /* General Helper Class */

    public static function getMaxBuyAmount($user,$stockvalue,$boughtamount){
      $floor1 = floor( ($user->liquidcash - ($user->shortval / 4) ) / (1.002 * $stockvalue ) );
      $floor2 = floor( ($user->liquidcash + $user->marketvalue) / (6 * 1.002 * $stockvalue) );

      $max_amount = max(min($floor1, $floor2 - $boughtamount), 0);
      return $max_amount;
    }

    public static function getMaxShortAmount($user,$stockvalue,$shortedamount){
      $floor1 = floor((( 4 * $user->liquidcash) - $user->shortval) / ( $stockvalue * 1.004 ) );
      $floor2 =  floor(($user->liquidcash + $user->marketvalue - $user->shortval ) / (6 * $stockvalue * 1.004) );
      $max_amount = max(min($floor1, $floor2 - $shortedamount), 0);
      return $max_amount;

    }

    public static function Buy($user, $symbol, $amount, $stock_data, $skey) {
      try{
          DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
            BoughtStock::buyUpdate($user->id, $symbol, $amount,$stock_data['value']);
            History::create([
              'playerid' => $user->id,
              'symbol' => $symbol,
              'transaction_type' => History::TYPE_BUY,
              'amount' => $amount,
              'value' => $stock_data['value'],
              'skey' => $skey,
              'transaction_time' => Carbon::now()
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


  	public static function Sell($user, $symbol, $amount, $stock_data, $skey) {

      try{
          DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
            BoughtStock::sellUpdate($user->id, $symbol, $amount,$stock_data);
            History::create([
              'playerid' => $user->id,
              'symbol' => $symbol,
              'transaction_type' => History::TYPE_SELL,
              'amount' => $amount,
              'value' => $stock_data['value'],
              'skey' => $skey,
              'transaction_time' => Carbon::now()
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

  	public static function Short($user, $symbol, $amount, $stock_data, $skey) {

      try{
          DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
            ShortSell::shortUpdate($user->id, $symbol, $amount,$stock_data['value']);
            History::create([
              'playerid' => $user->id,
              'symbol' => $symbol,
              'transaction_type' => History::TYPE_SHORT_SELL,
              'amount' => $amount,
              'value' => $stock_data['value'],
              'skey' => $skey,
              'transaction_time' => Carbon::now()
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

  	public static function Cover($user, $symbol, $amount, $stock_data, $skey) {

      try{
          DB::transaction(function() use($user,$symbol,$amount,$stock_data,$skey){
            //extra db call!
            $short = ShortSell::where('playerid', $user->id)
                                  ->where('symbol', $symbol)
                                  ->first();
            $oldaverage = $short->avg;

            ShortSell::coverUpdate($user->id, $symbol, $amount,$stock_data);
            History::create([
              'playerid' => $user->id,
              'symbol' => $symbol,
              'transaction_type' => History::TYPE_COVER,
              'amount' => $amount,
              'value' => $stock_data['value'],
              'skey' => $skey,
              'transaction_time' => Carbon::now()
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
