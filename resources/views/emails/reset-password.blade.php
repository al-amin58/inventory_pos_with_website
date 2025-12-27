<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial;">
    <h2>Password Reset Request</h2>
    <p>Click the button below to reset your password:</p>
    <table>
        <tr>
            <td align="center" style="padding-bottom:30px;">
                <a href="{{ $link }}"
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
                    Reset Password
                </a>
            </td>
        </tr>
    </table>

    <p>This link will expire in 60 minutes.</p>
</body>
</html>
