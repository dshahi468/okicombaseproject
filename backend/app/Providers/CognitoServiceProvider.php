<?php

namespace App\Providers;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Illuminate\Support\ServiceProvider;

class CognitoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(CognitoIdentityProviderClient::class,function($app){
            return new CognitoIdentityProviderClient([
                'region'=>env('AWS_DEFAULT_REGION'),
                'version'=>'2016-04-18',
                'credentials'=>[
                    'key'=>env('AWS_ACCESS_KEY_ID'),
                    'secret'=>env('AWS_SECRET_ACCESS_KEY'),
                ],
            ]);
        });
    }
    

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
