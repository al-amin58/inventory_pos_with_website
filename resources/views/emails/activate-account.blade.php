<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Activate Account</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="padding:40px 15px;">
            <table width="100%" max-width="520" style="background:#ffffff;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:40px;">
                
                <!-- Logo / Title -->
                <tr>
                    <td style="text-align:center;padding-bottom:20px;">
                        <h2 style="margin:0;color:#4f46e5;">Activate Your Account</h2>
                    </td>
                </tr>

                <!-- Greeting -->
                <tr>
                    <td style="color:#374151;font-size:16px;padding-bottom:15px;">
                        Hello <strong>{{ $user->name }}</strong>,
                    </td>
                </tr>

                <!-- Message -->
                <tr>
                    <td style="color:#4b5563;font-size:15px;line-height:1.6;padding-bottom:30px;">
                        Thank you for registering. Please confirm your email address by clicking the button below.
                    </td>
                </tr>

                <!-- Button -->
                <tr>
                    <td align="center" style="padding-bottom:30px;">
                        <a href="{{ $activationUrl }}"
                           style="
                               display:inline-block;
                               padding:14px 32px;
                               background:#4f46e5;
                               color:#ffffff;
                               text-decoration:none;
                               font-size:15px;
                               font-weight:600;
                               border-radius:8px;
                           ">
                            Activate Account
                        </a>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="color:#6b7280;font-size:13px;line-height:1.6;">
                        If you didn’t create this account, you can safely ignore this email.
                        <br><br>
                        Thanks,<br>
                        <strong>{{ config('app.name') }}</strong>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
