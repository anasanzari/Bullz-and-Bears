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

  public static function shortUpdate($user, $symbol, $amount, $average){

      $short = ShortSell::where('playerid', $user->id)
                            ->where('symbol', $symbol)
                            ->first();
      if($short){
        $short->avg = ($short->avg * $short->amount + $amount * $average)/( $short->amount + $amount);
        $short->amount += $amount;
        $short->updateValues($user,$symbol);

      }else{
        $short = ShortSell::create([
          'playerid' => $user->id,
          'symbol' => $symbol,
          'amount' => $amount,
          'avg' => $average
        ]);
      }
      return $short;
  }

  public static function coverUpdate($user, $symbol, $amount, $stock_data){
    $average = $stock_data['value'];
    $short = ShortSell::where('playerid', $user->id)
                          ->where('symbol', $symbol)
                          ->first();
    if($short){

      if ($amount != $stock_data['shorted_amount']){
        $short->avg = ($short->avg * $short->amount - $amount * $average)/( $short->amount - $amount);
        $short->amount -= $amount;
        $short->updateValues($user,$symbol);
      }else{
        $short->deleteStock($user,$symbol);
      }

    }else{
      //throw an exception
    }
    return $short;
  }

  public function updateValues($user,$symbol){
    DB::table($this->table)
        ->where('playerid', $user->id)
        ->where('symbol', $symbol)
        ->update(['avg' => $this->avg, 'amount' => $this->amount]);
  }

  public function deleteStock($user,$symbol){
    DB::table($this->table)
        ->where('playerid', $user->id)
        ->where('symbol', $symbol)
        ->delete();
  }

}
