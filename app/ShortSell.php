<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;


class ShortSell extends Model
{
  protected $fillable = [
      'playerid', 'symbol', 'amount', 'avg'
  ];

  public $timestamps = false;

  public $table = 'short_sell';

  public static function shortUpdate($userid, $symbol, $amount, $average){

      $short = ShortSell::where('playerid', $userid)
                            ->where('symbol', $symbol)
                            ->first();
      if($short){
        $short->avg = ($short->avg * $short->amount + $amount * $average)/( $short->amount + $amount);
        $short->amount += $amount;
        $short->updateValues($userid,$symbol);

      }else{
        $short = ShortSell::create([
          'playerid' => $userid,
          'symbol' => $symbol,
          'amount' => $amount,
          'avg' => $average
        ]);
      }
      return $short;
  }

  public static function coverUpdate($userid, $symbol, $amount, $stock_data){
    $average = $stock_data['value'];
    $short = ShortSell::where('playerid', $userid)
                          ->where('symbol', $symbol)
                          ->first();
    if($short){

      if ($amount != $stock_data['shorted_amount']){
        $short->avg = ($short->avg * $short->amount - $amount * $average)/( $short->amount - $amount);
        $short->amount -= $amount;
        $short->updateValues($userid,$symbol);
      }else{
        $short->deleteStock($userid,$symbol);
      }

    }else{
      //throw an exception
    }
    return $short;
  }

  public function updateValues($userid,$symbol){
    DB::table($this->table)
        ->where('playerid', $userid)
        ->where('symbol', $symbol)
        ->update(['avg' => $this->avg, 'amount' => $this->amount]);
  }

  public function deleteStock($userid,$symbol){
    DB::table($this->table)
        ->where('playerid', $userid)
        ->where('symbol', $symbol)
        ->delete();
  }

}
