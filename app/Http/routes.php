<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function(){
	Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
	Route::post('authenticate', 'AuthenticateController@authenticate');
  Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
  Route::post('fbauthenticate','AuthenticateController@fb_authenticate');

  Route::post('stocks','ApiController@getStocks');
  Route::post('player','ApiController@getPlayer');
  //portfolio
  Route::post('bought','ApiController@getBought');
  Route::post('shorted','ApiController@getShorted');
  Route::post('history','ApiController@getHistory');
  //rankings
  Route::post('rankings/daily','ApiController@getDailyRankings');
  Route::post('rankings/weekly','ApiController@getWeeklyRankings');
  Route::post('rankings/overall','ApiController@getOverallRankings');
  //scheduled
  Route::post('scheduled','ApiController@getScheduled');
  Route::post('cancelschedule','ApiController@cancelSchedule');
  //trade n schedule
  Route::post('dotrade','ApiController@doTrade');
  Route::post('doschedule','ApiController@doSchedule');

  //Route::post('debug','ApiController@valupdate');

  //Finance Api

  Route::post('charts/overall','FinanceApiController@overall');
  Route::post('charts/{symbol}','FinanceApiController@symbol');

  //Statistics

  Route::post('stats/trade', 'ApiController@trade_stats');
  Route::post('stats/schedule', 'ApiController@schedule_stats');

});

//backend
