<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Admin;
use Auth;


class AuthenticateController extends Controller
{

  public function __construct()
  {
      // Apply the jwt.auth middleware to all methods in this controller
      // except for the authenticate method. We don't want to prevent
      // the user from retrieving their token if they don't already have it
      $this->middleware('jwt.auth', ['except' => ['authenticate','fb_authenticate', 'admin_authenticate']]);
  }

  /**
   * Return the user
   *
   * @return Response
   */
  public function index()
  {

      // Retrieve all the users in the database and return them
      $users = User::all();

      return $users;
  }


  public function fb_authenticate(Request $request){

    $values = $request->all();
    $fb_token = $values['fb_token'];
    $res = @file_get_contents("https://graph.facebook.com/me?access_token=$fb_token");
    $data = json_decode($res,TRUE);

    if(!isset($data) || isset($data['error'])){
      return response()->json(['error' => 'invalid_token'], 401);
    }
    $fbid = $data['id'];

    $user = User::where('fbid',$fbid)->get()->first();

    if(!$user){
      //new fb user.
      $start_money = config('bullz.start_money');
      $user = User::create(['name'=>$data['name'],'fbid'=>$fbid, 'liquidcash'=> $start_money,
                            'marketvalue'=>0, 'shortval' => 0,
                             'weekworth'=>$start_money,'dayworth'=>$start_money,'rank'=>0,
                             'email'=> "mail"]);
    }

    $user->setDetails();

    try {
        if (! $token = JWTAuth::fromUser($user)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
    } catch (JWTException $e) {
        // something went wrong
        return response()->json(['error' => 'could_not_create_token'], 500);
    }

    return ['token'=> $token, 'user' => $user];


  }


  public function admin_authenticate(Request $request){

    $values = $request->all();
    $fb_token = $values['fb_token'];
    $res = @file_get_contents("https://graph.facebook.com/me?access_token=$fb_token");
    $data = json_decode($res,TRUE);

    if(!isset($data) || isset($data['error'])){
      return response()->json(['error' => 'invalid_token'], 401);
    }
    $fbid = $data['id'];

    $user = User::where('fbid',$fbid)->get()->first();
    $admin = Admin::where('fbid',$fbid)->get()->first();
    if(!$user&&!$admin){
        return response()->json(['error' => 'invalid_admin'], 401);
    }

    $user->setDetails();

    try {
        if (! $token = JWTAuth::fromUser($user)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
    } catch (JWTException $e) {
        // something went wrong
        return response()->json(['error' => 'could_not_create_token'], 500);
    }

    return ['token'=> $token, 'user' => $user];


  }


  public function authenticate(Request $request)
  {
      $credentials = $request->only('email', 'password');

      try {
          // verify the credentials and create a token for the user
          if (! $token = JWTAuth::attempt($credentials)) {
              return response()->json(['error' => 'invalid_credentials'], 401);
          }
      } catch (JWTException $e) {
          // something went wrong
          return response()->json(['error' => 'could_not_create_token'], 500);
      }

      // if no errors are encountered we can return a JWT
      return response()->json(compact('token'));
  }

  public function getAuthenticatedUser()
  {
      try {

          if (! $user = JWTAuth::parseToken()->authenticate()) {
              return response()->json(['user_not_found'], 404);
          }

      } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

          return response()->json(['token_expired'], $e->getStatusCode());

      } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

          return response()->json(['token_invalid'], $e->getStatusCode());

      } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

          return response()->json(['token_absent'], $e->getStatusCode());

      }

      // the token is valid and we have found the user via the sub claim
      return response()->json(compact('user'));
  }

}
