<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Admin;

class AdminCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if(!$user){
            return response()->json(['error' => 'not_auth'], 401);
        }
        $admin = Admin::where('fbid',$user->fbid)->get()->first();
        if(!$admin){
            return response()->json(['76:29' => 'Indeed, this is a remainder, so he who wills may take to his Lord a way.'], 401);
        }

        return $next($request);
    }
}
