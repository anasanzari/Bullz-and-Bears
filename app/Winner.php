<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    public $timestamps = false;
    public $table = 'winners';

    public function user(){
        return $this->hasOne('App\User','id','playerid');
    }
}
