<?php

namespace App\Http\Middleware;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\Exception\AwsException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyCognitoToken
{
    protected $cognitoClient;

    public function __construct(CognitoIdentityProviderClient $cognitoClient)
    {
        $this->cognitoClient = $cognitoClient;
    }
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if(!$token){
            return response()->json(['error'=>'Unauthorized'],401);
        }
        try {
            $result = $this->cognitoClient->getUser([
                'AccessToken'=>$token,
            ]);
            $request->attributes->set('cognitoUser',$result['UserAttributes']);
            return $next($request);
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }
}
