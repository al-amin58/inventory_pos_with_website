<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Crypt;

class ActivateAccountMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build()
    {
        $encryptedId = Crypt::encryptString($this->user->id);

        $activationUrl = url('/api/activate-account/'.$encryptedId);

        return $this->subject('Activate your account')
            ->view('emails.activate-account')
            ->with([
                'activationUrl' => $activationUrl,
                'user' => $this->user,
            ]);
    }

   

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
