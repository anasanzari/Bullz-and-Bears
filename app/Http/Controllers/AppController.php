<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\AppState;
use App\Winner;

class AppController extends Controller
{
    // serves views according to state.

    public function index() {
        $state = AppState::find(1);

        switch($state->state){
                case AppState::STATE_ACTIVE :
                    return view('index');
                    break;
                case AppState::STATE_NOT_LAUNCHED_YET :
                    return view('not_launch');
                    break;
                case AppState::STATE_BACKEND_IN_PROGRESS :
                    return view('backend_progress');
                    break;
                case AppState::STATE_GAME_ENDED :
                    $homewinners = Winner::where('inside',1)->with('user')->orderBy('rank')->get();
                    $awaywinners = Winner::where('inside',0)->with('user')->orderBy('rank')->get();
                    return view('game_ended',['home' => $homewinners, 'away' => $awaywinners]);
                    break;

        }

        return view('index');

    }

    public function admin(){
        return view('admin');
    }

    public function test(){
        return view('index');
    }


}
