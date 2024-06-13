<?php

namespace App\Http\Middleware;

use App\Models\PersonalAccessTokens;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyUserToken
{
    
    public function handle(Request $request, Closure $next): Response
    {
        $accessToken = $request->bearerToken();
        if(!$accessToken){
            return response()->json(['error'=>'Unauthorized'],401);
        }
        $check = PersonalAccessTokens::where(['tokenable_type'=>'ACCESS_TOKEN','token'=>$accessToken])->where('expires_at','>=',Carbon::now())->exists();
        if($check){
            $userId = PersonalAccessTokens::where(['tokenable_type'=>'ACCESS_TOKEN','token'=>$accessToken])->first()->tokenable_id;
            $request->merge(['userId'=>$userId]);
            return $next($request);
        }else{
            return response()->json(['error'=>'Unauthorized error','message'=>'Access token expired.'],401);
        }
    }
}
