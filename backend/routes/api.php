<?php

use App\Http\Controllers\AwsAuthentication\CognitoAuthController;
use App\Http\Controllers\DefaultAuthentication\LaravelAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// laravel default authentication part start from here
Route::post('/register',env("APP_BACKEND")=="aws"?[CognitoAuthController::class,'signup']:[LaravelAuthController::class,'signup'])->name('register');
Route::post('/login',env("APP_BACKEND")=="aws"?[CognitoAuthController::class,'signin']:[LaravelAuthController::class,'signin'])->name('signin');
Route::post('/verify-email',env("APP_BACKEND")=="aws"?[CognitoAuthController::class,'verifyaccount']:[LaravelAuthController::class,'verifyaccount'])->name('verification.verify');
Route::post('/resend-confirmation-pin',env("APP_BACKEND")=="aws"?[CognitoAuthController::class,'resendconfirmationpin']:[LaravelAuthController::class,'resendconfirmationpin'])->name('verification.resendpin');
Route::post('/forgot-password',env("APP_BACKEND")=="aws"?[CognitoAuthController::class,'forgotpassword']:[LaravelAuthController::class,'forgotpassword'])->name('forgotpassword');
Route::post('/confirm-password',env("APP_BACKEND")=="aws"?[CognitoAuthController::class,'confirmpassword']:[LaravelAuthController::class,'confirmpassword'])->name('confirmpassword');

Route::middleware(env("APP_BACKEND")=="aws"?'cognitoAuthenticated':'userAuthenticated')->group(function(){
    Route::post('/logout', env("APP_BACKEND")=="aws"?[CognitoAuthController::class, 'signout']:[LaravelAuthController::class, 'signout'])->name('logout');
});
// laravel default authentication part ends here
// aws cognito authentication api part start from here
// Route::post('/awsregister',[CognitoAuthController::class,'signup'])->name('awsregister');
// Route::post('/awslogin',[CognitoAuthController::class,'signin'])->name('awssignin');
// Route::post('/aws-verify-email',[CognitoAuthController::class,'verifyaccount'])->name('verification.awsverify');
// Route::post('/aws-resend-confirmation-pin',[CognitoAuthController::class,'resendconfirmationpin'])->name('verification.awsresendpin');
// Route::post('/aws-forgot-password',[CognitoAuthController::class,'forgotpassword'])->name('awsforgotpassword');
// Route::post('/aws-confirm-password',[CognitoAuthController::class,'confirmpassword'])->name('awsconfirmpassword');

// Route::middleware('cognitoAuthenticated')->group(function(){
//     Route::post('/awslogout', [CognitoAuthController::class, 'signout'])->name('awslogout');
// });
// aws cognito authentication api part end here

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
