<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class History extends Model
{

  const TYPE_BUY = "Buy";
  const TYPE_SELL = "Sell";
  const TYPE_COVER = "Cover";
  const TYPE_SHORT_SELL = "Short Sell";

  const TYPES =  array(
                        History::TYPE_BUY,
                        History::TYPE_SELL,
                        History::TYPE_COVER,
                        History::TYPE_SHORT_SELL
                      );

  protected $fillable = [
      'playerid', 'symbol',
      'transaction_type', 'amount', 'value',
      'transaction_time',
      'skey'
  ];

  public $timestamps = false;

  public $table = 'history';

  public function getTransactionTimeAttribute($value)
  {
      $val = Carbon::createFromFormat('Y-m-d H:i:s', $value,'Asia/Calcutta')->toIso8601String();
      return $val;
  }

}
