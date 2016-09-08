<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppState extends Model
{
    const STATE_ACTIVE = "ACTIVE";
    const STATE_NOT_LAUNCHED = "NOT_LAUNCHED_YET";
    const STATE_BACKEND_WORK_IN_PROGRESS = "BACKEND_IN_PROGRESS";
    const STATE_GAME_ENDED = "GAME_ENDED";

    protected $fillable = [
        'id', 'state'
    ];

    public $timestamps = false;

    public $table = 'appstate';
}
