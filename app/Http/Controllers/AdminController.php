<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

use App\Http\Requests;
use App\Stock;
use App\History;
use App\BoughtStock;
use App\ShortSell;
use App\User;
use App\Schedules;
use App\AppState;

use Carbon\Carbon;
use Validator;

use App\Transaction;
use App\Admin;
use Auth;


class AdminController extends Controller
{
    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it

        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
        //check if admin!

        date_default_timezone_set('Asia/Calcutta');
        setlocale(LC_MONETARY, 'en_IN');

        $user = Auth::user();
        if(!$user){
            return response()->json(['error' => 'not_auth'], 401);
        }
        $admin = Admin::where('fbid',$user->fbid)->get()->first();
        if(!$admin){
            return response()->json(['76:29' => 'Indeed, this is a remainder, so he who wills make take to his Lord a way.'], 401);
        }

    }

    public function getOverview(){

      //get authenticated user
      $user = Auth::user();
      $users = User::count();
      $transactions = History::count();
      $scheduled = Schedules::count();

      $overview = [
          'total_users' => $users,
          'total_transactions' => $transactions,
          'total_scheduled' => $scheduled
      ];
      return $overview;
    }

    public function stocks(){
        return Stock::all();
    }

    public function editStock(Request $request){
        $data = $request->all();
        $symbol = $data['symbol'];
        $name = $data['name'];
        $stock = Stock::where('symbol','=',$symbol)->get();
        Stock::where('symbol','=',$symbol)->update([
            'name' => $name
        ]);
        return $stock;
    }

    public function deleteStock(Request $request){
        $data = $request->all();
        $symbol = $data['symbol'];
        Stock::where('symbol','=',$symbol)->delete();
    }

    public function users(){
        return User::all();
    }

    public function state(){
        $state = AppState::find(1);
        return $state;
    }

    public function editState(Request $request){
        $state = AppState::find(1);
        $data = $request->all();

        if($state){
            $state->state = $data['state'];
            $state->save();
        }else{
            $state = AppState::create(['id'=>1, 'state' => $data['state'] ]);
        }
        return $state;
    }

}
