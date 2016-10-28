<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedules extends Model
{

  const TYPE_LOW = "low";
  const TYPE_HIGH = "high";

  protected $fillable = [
      'playerid', 'symbol', 'transaction_type', 'scheduled_price', 'no_shares', 'pend_no_shares', 'flag'
  ];

  public $timestamps = false;

  public $table = 'schedules';

  public static function updateShares($amount,$skey){

      $schedule = Schedules::find($skey);
      if($schedule){
        $schedule->pend_no_shares -= $amount;
        $schedule->save();
      }
      return $schedule;
  }

  public static function updateSharesRevert($amount,$skey){

      $schedule = Schedules::find($skey);
      if($schedule){
        $schedule->pend_no_shares += $amount;
        $schedule->save();
      }
      return $schedule;
  }

}
