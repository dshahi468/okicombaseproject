<?php

use App\Http\Controllers\AwsAuthentication\CognitoAuthController;
use App\Http\Controllers\DefaultAuthentication\LaravelAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// laravel default authentication part start from here
Route::post('/register',[LaravelAuthController::class,'signup'])->name('register');
Route::post('/login',[LaravelAuthController::class,'signin'])->name('signin');
Route::post('/verify-email',[LaravelAuthController::class,'verifyaccount'])->name('verification.verify');
Route::post('/resend-confirmation-pin',[LaravelAuthController::class,'resendconfirmationpin'])->name('verification.resendpin');
Route::post('/forgot-password',[LaravelAuthController::class,'forgotpassword'])->name('forgotpassword');
Route::post('/confirm-password',[LaravelAuthController::class,'confirmpassword'])->name('confirmpassword');

Route::middleware('userAuthenticated')->group(function(){
    Route::post('/logout', [LaravelAuthController::class, 'signout'])->name('logout');
});
// laravel default authentication part ends here
// aws cognito authentication api part start from here
Route::post('/awsregister',[CognitoAuthController::class,'signup'])->name('awsregister');
Route::post('/awslogin',[CognitoAuthController::class,'signin'])->name('awssignin');
Route::post('/aws-verify-email',[CognitoAuthController::class,'verifyaccount'])->name('verification.awsverify');
Route::post('/aws-resend-confirmation-pin',[CognitoAuthController::class,'resendconfirmationpin'])->name('verification.awsresendpin');
Route::post('/aws-forgot-password',[CognitoAuthController::class,'forgotpassword'])->name('awsforgotpassword');
Route::post('/aws-confirm-password',[CognitoAuthController::class,'confirmpassword'])->name('awsconfirmpassword');

Route::middleware('cognitoAuthenticated')->group(function(){
    Route::post('/awslogout', [CognitoAuthController::class, 'signout'])->name('awslogout');
});
// aws cognito authentication api part end here

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
