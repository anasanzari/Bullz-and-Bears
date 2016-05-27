<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{

  protected $fillable = [
      'id', 'playerid', 'symbol', 'transaction_type', 'amount', 'value', 'transaction_time'
  ];

  public $timestamps = false;

  public $table = 'history';

}
