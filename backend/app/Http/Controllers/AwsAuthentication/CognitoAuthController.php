<?php

namespace App\Http\Controllers\AwsAuthentication;

use App\Http\Controllers\Controller;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\Exception\AwsException;
use Illuminate\Http\Request;

class CognitoAuthController extends Controller
{
    protected $cognitoClient;

    public function __construct(CognitoIdentityProviderClient $cognitoClient)
    {
        $this->cognitoClient = $cognitoClient;
    }

    public function signup(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required|min:8',
        ]);
        try {
            $result = $this->cognitoClient->signUp([
                'ClientId'=>env('COGNITO_CLIENT_ID'),
                'Username'=>$request->email,
                'Password'=>$request->password,
                'UserAttributes'=>[
                    [
                        'Name'=>'email',
                        'Value'=>$request->email,
                    ],
                    [
                        'Name'=>'name',
                        'Value'=>$request->name,
                    ]
                ]
                    ]);
                    return response()->json(['message'=>'Sign up successful.','result'=>$result],200);
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function verifyaccount(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'verificationPin'=>'required',
        ]);
        try {
            $result = $this->cognitoClient->confirmSignUp([
                'ClientId'=>env('COGNITO_CLIENT_ID'),
                'Username'=>$request->email,
                'ConfirmationCode'=>$request->verificationPin,
            ]);
            return response()->json(['message'=>'Email verified successfully.','result'=>$result],200);
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function resendconfirmationpin(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
        ]);
        try {
            $result = $this->cognitoClient->resendConfirmationCode([
                'ClientId'=>env('COGNITO_CLIENT_ID'),
                'Username'=>$request->email,
            ]);
            return response()->json(['message'=>'Confirmation code resent successfully.','result'=>$result],200);
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function signin(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required|min:8',
        ]);
        try {
            $result = $this->cognitoClient->initiateAuth([
                'AuthFlow'=>'USER_PASSWORD_AUTH',
                'ClientId'=>env('COGNITO_CLIENT_ID'),
                'AuthParameters'=>[
                    'USERNAME'=>$request->email,
                    'PASSWORD'=>$request->password,
                ]
                ]);
                if (isset($result['AuthenticationResult'])) {
                    $authResult = $result['AuthenticationResult'];
                    $accessToken = $authResult['AccessToken'] ?? null;
                    $idToken = $authResult['IdToken'] ?? null;
                    $refreshToken = $authResult['RefreshToken'] ?? null;
    
                    return response()->json([
                        'tokenInfo'=>['accessToken'=>$authResult['AccessToken'],'refreshToken'=>$authResult['RefreshToken'],'token_type'=>$authResult['TokenType']],
                        'message' => 'Sign-in successful',
                        'authResult'=>$authResult,
                        'accessToken' => $accessToken,
                        'idToken' => $idToken,
                        'refreshToken' => $refreshToken,
                    ], 200);
                }else{
                    return response()->json(['message'=>'Signin successful','result'=>$result],200);
                }
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function forgotpassword(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
        ]);
        try {
            $result = $this->cognitoClient->forgotPassword([
                'ClientId'=>env('COGNITO_CLIENT_ID'),
                'Username'=>$request->email,
            ]);
            return response()->json(['message'=>'Password reset code sent successfully.','result'=>$result],200);
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function confirmpassword(Request $request)
    {
        $request->validate([
            'code'=>'required',
            'email'=>'required|email',
            'password'=>'required|min:8',
        ]);
        try {
            $result = $this->cognitoClient->confirmForgotPassword([
                'ClientId'=>env('COGNITO_CLIENT_ID'),
                'Username'=>$request->email,
                'ConfirmationCode'=>$request->code,
                'Password'=>$request->password,
            ]);
            return response()->json(['message'=>'Password reset successfully.','result'=>$result],200);
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function signout(Request $request)
    {
        try {
            $result = $this->cognitoClient->globalSignOut([
                'AccessToken'=>$request->bearerToken(),
            ]);
            return response()->json(['message'=>'Logout successfully','result'=>$result],200);
        } catch (AwsException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }
}
