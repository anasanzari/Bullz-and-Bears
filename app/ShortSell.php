<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShortSell extends Model
{
  protected $fillable = [
      'playerid', 'symbol', 'amount', 'avg'
  ];

  public $timestamps = false;

  public $table = 'short_sell';

}
