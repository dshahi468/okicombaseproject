<?php

namespace App\Listeners;

use App\Events\UserEmailVerification;
use App\Mail\UserEmailVerificationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class ListenUserEmailVerification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserEmailVerification $event): void
    {
        Mail::to($event->user->email)->send(new UserEmailVerificationMail($event->user));
    }
}
