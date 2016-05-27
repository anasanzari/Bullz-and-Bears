<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedules extends Model
{
  protected $fillable = [
      'skey', 'playerid', 'symbol', 'transaction_type', 'scheduled_price', 'no_shares', 'pend_no_shares', 'flag'
  ];

  public $timestamps = false;

  public $table = 'schedules';

}
