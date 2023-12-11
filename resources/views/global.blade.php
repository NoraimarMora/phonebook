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
        <link href="{{ asset('css/light-bootstrap-dashboard.css') }}" rel="stylesheet" />
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('font-awesome/css/all.min.css') }}">

        <!--   Core JS Files   -->
        <script src="{{ asset('js/core/jquery.3.2.1.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/core/popper.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/core/bootstrap.min.js') }}" type="text/javascript"></script>

        <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
        <script src="{{ asset('js/plugins/bootstrap-switch.js') }}"></script>

        <!--  Chartist Plugin  -->
        <script src="{{ asset('js/plugins/chartist.min.js') }}"></script>

        <!--  Notifications Plugin    -->
        <script src="{{ asset('js/plugins/bootstrap-notify.js') }}"></script>

        <!-- Custom JS -->
        <script src="{{ asset('js/functions.js') }}" type="text/javascript"></script>
    </head>
    <body>
        <div class="wrapper">
            <div class="sidebar">
                <div class="sidebar-wrapper">
                    <div class="logo">
                        <a href="#" class="simple-text">
                            <img src="{{ asset('img/phonebook_512x512.png') }}" alt="Phonebook">
                        </a>
                    </div>
                    <ul class="nav">
                        <li class="nav-item @yield('home_active')">
                            <a class="nav-link" href="{{ action('HomeController@index') }}">
                                <i class="fa fa-home"></i>
                                <p>Inicio</p>
                            </a>
                        </li>
                        <li class="nav-item @yield('contacts_active')">
                            <a class="nav-link" href="{{ action('ContactController@index') }}">
                                <i class="fa fa-address-book"></i>
                                <p>Contactos</p>
                            </a>
                        </li>
                        <li class="nav-item @yield('favorites_active')">
                            <a class="nav-link" href="{{ action('ContactController@favorites') }}">
                                <i class="fa fa-heart"></i>
                                <p>Favoritos</p>
                            </a>
                        </li>
                        <li class="nav-item @yield('groups_active')">
                            <a class="nav-link" href="{{ action('GroupController@index') }}">
                                <i class="fa fa-tags"></i>
                                <p>Etiquetas</p>
                            </a>
                        </li>
                        @if(Auth::user()->role == 'superadmin')
                            <li class="nav-item @yield('users_active')">
                                <a class="nav-link" href="{{ action('UserController@index') }}">
                                    <i class="fa fa-user-friends"></i>
                                    <p>Usuarios</p>
                                </a>
                            </li>
                        @endif
                        <li class="nav-item @yield('trash_active')">
                            <a class="nav-link" href="{{ action('ContactController@trash') }}">
                                <i class="fa fa-trash"></i>
                                <p>Papelera</p>
                            </a>
                        </li>
                        <li>
                            <a id="logout-btn" class="nav-link" href="">
                                <i class="fa fa-sign-out-alt"></i>
                                <p>Cerrar Sesion</p>
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                {{ csrf_field() }}
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-panel">
                <!-- Navbar -->
                <nav class="navbar navbar-expand-lg " color-on-scroll="500">
                    <div class="container-fluid">
                        <span class="navbar-brand">@yield('page_name')</span>
                        <button href="" class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-bar burger-lines"></span>
                            <span class="navbar-toggler-bar burger-lines"></span>
                            <span class="navbar-toggler-bar burger-lines"></span>
                        </button>
                    </div>
                </nav>
                <!-- End Navbar -->
                <div class="content">
                    <div class="container-fluid">
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>