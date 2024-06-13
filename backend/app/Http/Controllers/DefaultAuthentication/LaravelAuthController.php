<?php

namespace App\Http\Controllers\DefaultAuthentication;

use App\Events\UserEmailVerification;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\FormValidationHelper;
use App\Models\PersonalAccessTokens;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LaravelAuthController extends Controller
{
    public function signup(Request $request)
    {
        try {
            $helper = new FormValidationHelper();
            $validatedData = $helper->registerFormValidation($request);
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'verification_pin'=>rand(100000,999999)
            ]);
            event(new UserEmailVerification($user));
            return response()->json(['message'=>'Sign up successful.','result'=>null],200);
        } catch (ValidationException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function verifyaccount(Request $request)
    {
        try {
            $helper = new FormValidationHelper();
            $validatedData = $helper->verifyAccount($request);
            $flag=true;
            DB::beginTransaction();
            $user = User::where('email',$validatedData['email'])->first();
            $user->email_verified_at = date('Y-m-d H:i:s');
            $user->verification_pin = null;
            if(!$user->save())
                $flag=false;
            if($flag)
                DB::commit();
            else
                DB::rollBack();
            return response()->json(['message'=>'Email verified successfully.','result'=>null],200);
        } catch (ValidationException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function resendconfirmationpin(Request $request)
    {
        try {
            $helper = new FormValidationHelper();
            $validatedData = $helper->resendVerificationPin($request);
            $flag=true;
            $user = User::where('email',$validatedData['email'])->first();
            $user->verification_pin = rand(100000,999999);
            if(!$user->save())
                $flag=false;
            event(new UserEmailVerification($user));
            if($flag)
                DB::commit();
            else
                DB::rollBack();
            return response()->json(['message'=>'Confirmation code resent successfully.','result'=>null],200);
        } catch (ValidationException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function signin(LoginRequest $request)
    {
        try {
            $request->authenticate();
            $user = User::where('email',$request->email)->first();
            $token = PersonalAccessTokens::create([
                'name'=>'PERSONAL_ACCESS_TOKEN',
                'tokenable_type'=>'ACCESS_TOKEN',
                'token'=>$user->id.Str::random(50).time(),
                'tokenable_id'=>$user->id,
                'expires_at'=>Carbon::now()->addDays(env('AUTHENTICATION_ACCESS_TOKEN_EXPIRY', 30)),
            ]);
            return response()->json(['message'=>'Sign-in successful','tokenInfo'=>$token,'userInfo'=>$user]);
        } catch (ValidationException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function forgotpassword(Request $request)
    {
        try {
            $helper = new FormValidationHelper();
            $validatedData = $helper->searchUserValidation($request);
            $flag=true;
            DB::beginTransaction();
            $user = User::where('email',$validatedData['email'])->first();
            $user->verification_pin = rand(100000,999999);
            if(!$user->save())
                $flag=false;
            if($flag)
                DB::commit();
            else
                DB::rollBack();
            event(new UserEmailVerification($user));
            return response()->json(['message'=>'Password reset code sent successfully.','result'=>null],200);
        } catch (ValidationException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function confirmpassword(Request $request)
    {
        try {
            $helper = new FormValidationHelper();
            $validatedData = $helper->resetPasswordValidator($request);
            $flag = true;
            DB::beginTransaction();
            $model = User::where('email',$validatedData['email'])->first();
            $model->fill([
                'password'=>Hash::make($validatedData['password']),
                'remember_token'=>Str::random(60),
                'verification_pin'=>null,
            ]);
            if(!$model->save())
                $flag=false;
            if($flag)
                DB::commit();
            else
                DB::rollBack();
            return response()->json(['message'=>'Password reset successfully.','result'=>null],200);
        } catch (ValidationException $e) {
            return response()->json(['error'=>$e->getMessage()],500);
        } 
    }

    public function signout(Request $request)
    {
        try {
            $token = PersonalAccessTokens::where('token',$request->bearerToken())->first();
            $token->expires_at = '1990-01-01 01:01';
            $token->save();
            return response()->json(['message'=>'Logout successfully.','flag'=>true]);
        } catch (ValidationException $th) {
            return response()->json(['error'=>$th]);
        }
    }
}
