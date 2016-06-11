<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class BoughtStock extends Model
{
  protected $fillable = [
      'playerid', 'symbol', 'amount', 'avg'
  ];

  public $timestamps = false;

  public $table = 'bought_stocks';

  public function user(){
      return $this->belongsTo('App\User','playerid','id');
  }
	public function symbol(){
	    return $this->belongsTo('App\Stock','symbol','symbol');
	}

  public static function buyUpdate($userid, $symbol, $amount, $average){

      // updateOrCreate doesn't support composite keys. Laravel Design Desicions!!
      // Performance is least of my worries now. The following could be implemented in a single query.

      $bought = BoughtStock::where('playerid', $userid)
                            ->where('symbol', $symbol)
                            ->first();
      if($bought){
        //amount : total shares bought.
        //avg : average price. | avg * amount = total money spent on buying shares.
        $bought->avg = ($bought->avg * $bought->amount + $amount * $average)/( $bought->amount + $amount);
        $bought->amount += $amount;
        //$bought->save();
        $bought->updateValues($userid,$symbol);

      }else{
        $bought = BoughtStock::create([
          'playerid' => $userid,
          'symbol' => $symbol,
          'amount' => $amount,
          'avg' => $average
        ]);
      }
      return $bought;
  }

  public static function sellUpdate($userid, $symbol, $amount, $stock_data){
    $average = $stock_data['value'];
    $bought = BoughtStock::where('playerid', $userid)
                          ->where('symbol', $symbol)
                          ->first();
    if($bought){

      if ($amount != $stock_data['bought_amount']){
        $bought->avg = ($bought->avg * $bought->amount - $amount * $average)/( $bought->amount - $amount);
        $bought->amount -= $amount;
        $bought->updateValues($userid,$symbol);
      }else{
        $bought->deleteStock($userid,$symbol);
      }

    }else{
      //throw an exception
    }
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
