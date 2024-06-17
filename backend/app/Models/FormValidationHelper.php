<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;

class FormValidationHelper extends Model
{
    use HasFactory;

    public function registerFormValidation(Request $request)
    {
        $validatedData = $request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','string','lowercase','email','max:255',function($attribute,$value,$fail){
                $check = User::where('email',$value)->exists();
                if($check){
                    $fail("$value already exists.");
                }
            }],
            'password'=>['required','min:8'],
        ]);
        foreach ($validatedData as $key => $value) {
                $validatedData[$key] = strip_tags($value);
        }
        return $validatedData;
    }

    public function verifyAccount(Request $request)
    {
        $validatedData = $request->validate([
            'email'=>['required',function($attribute,$value,$fail){
                $user = User::where('email',$value)->first();
                if(!$user){
                    $fail("User with id $value do not exists.");
                }else{
                    if($user->email_verified_at){
                        $fail("Your email address is already verified.");
                    }    
                }
            }],
            'verificationPin'=>['required',function($attribute,$value,$fail) use ($request){
                $check = User::where(['email'=>$request->email,'verification_pin'=>$value])->exists();
                if(!$check){
                    $fail('Verification pin do not match.');
                }
            }]
        ]);
        return $validatedData;   
    }

    public function searchUserValidation(Request $request)
    {
        $validatedData = $request->validate([
            'email' => ['required','email',function($attribute,$value,$fail){
                $check =User::where('email',$value)->exists();
                if(!$check){
                    $fail("$value do not match with our record.");
                }
            }],
        ]);
        return $validatedData;
    }

    public function resetPasswordValidator(Request $request)
    {
        $validatedData = $request->validate([
            'email'=>['email','required',function($attribute,$value,$fail){
                $check = User::where('email',$value)->exists();
                if(!$check){
                    $fail('User do not exists.');
                }
            }],
            'password'=>['required','min:8'],
            'code'=>['required',function($attribute,$value,$fail) use ($request){
                $check = User::where(['email'=>$request->email,'verification_pin'=>$value])->exists();
                if(!$check)
                    $fail('Verification pin do not match.');
            }],
        ]);
        foreach($validatedData as $key=>$value){
            $validatedData[$key] = strip_tags($value);
        }
        return $validatedData;
    }

    public function resendVerificationPin(Request $request)
    {
        $validatedData = $request->validate([
            'email'=>['email','required',function($attribute,$value,$fail){
                $check = User::where('email',$value)->exists();
                if(!$check)
                    $fail('User do not exists.');
            }],
        ]);
        return $validatedData;
    }
}
