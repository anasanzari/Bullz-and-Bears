<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BoughtStock extends Model
{
  protected $fillable = [
      'playerid', 'symbol', 'amount', 'avg'
  ];

  public $timestamps = false;

  public $table = 'bought_stocks';
}
