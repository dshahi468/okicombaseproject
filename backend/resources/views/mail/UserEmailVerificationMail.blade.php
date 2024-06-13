<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>User Email Verification</title>
    <style>
        .email-verification-div{
            padding: 10px
        }
        .title{
            text-align: center
        }
    
        .card{
            max-width: 600px;
            background: #f1f1f1;
            padding: 15px;
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            color: #3a2c2c;
        }
        .greeting{
            font-weight: bold;
            margin-bottom: 10px;
        }
    
        .verification-pin{
            margin: 20px 0px;
            background: black;
            color: white;
            width: fit-content;
            padding: 10px 20px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 16px;
        }
    
        .info{
            margin-bottom: 10px
        }
    
        .link{
            color: blue;
            text-decoration: underline;
        }

        .copyright{
            font-size: 12px;
            text-align: center;
            color: #b1afaf;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-verification-div">
        <h2 class="title">{{env('APP_NAME')}}</h2>
        <div class="card">
            <div class="greeting">Hello! {{$user->name}}</div>
            <div>Please use the verification pin provided below to confirm your email address.</div>
            <div class="verification-pin">{{$user->verification_pin}}</div>
            <div class="info">If you did not create an account, no further action is required.</div>
            <div>Regards,</div>
            <div>{{env('APP_NAME')}}</div>
        </div>
        <div class="copyright">
            © <?=date('Y') ?> {{env('APP_NAME')}}. All rights reserved. 
        </div>
    </div>    
</body>
</html>


