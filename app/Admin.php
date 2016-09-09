<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'fbid'
    ];

    public $timestamps = false;

    public $table = 'admins';
}
