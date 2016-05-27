<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{

  protected $fillable = [
      'time_stamp', 'name', 'symbol', 'value', 'change',
      'daylow', 'dayhigh', 'weeklow', 'weekhigh',
      'change_perc','symbol'
  ];


  public $timestamps = false;
  public $table = 'stocks';

}
