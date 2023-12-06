<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Phonebook</title>

        <link rel="shortcut icon" href="{{ asset('img/phonebook_32x32.png') }}">

        <!-- CSS Files -->
        <link href="{{ asset('css/login.css') }}" rel="stylesheet" />
        <link href="{{ asset('css/light-bootstrap-dashboard.css') }}" rel="stylesheet" />
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('font-awesome/css/all.min.css') }}">

        <!--   Core JS Files   -->
        <script src="{{ asset('js/core/jquery.3.2.1.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/core/popper.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/core/bootstrap.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/plugins/bootstrap-notify.js') }}"></script>
        <!-- Custom JS -->
        <script src="{{ asset('js/functions.js') }}" type="text/javascript"></script>
    </head>
    <body>
        <div class="wrapper @if(session('login_error')) login-error @elseif(session('server_error')) server-error @endif">
            <form action="" method="POST">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <div class="logo">
                    <img src="{{ asset('img/phonebook_512x512.png') }}" alt="Phonebook">
                </div>
                <div class="container">
                    <div class="form-group">
                        <input class="form-control" type="email" placeholder="Correo Electronico" name="email" id="email" value="{{ old('email') }}" required>
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="password" placeholder="Contraseña" name="password" id="password" value="{{ old('password') }}" required>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-ge" type="submit">Entrar</button>
                    </div>
                    <input type="checkbox" name="remember" id="remember" value="1" style="display: none;" checked>
                </div>
            </form>
        </div>
    </body>
</html>