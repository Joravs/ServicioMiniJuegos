<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LilGames</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/style.css');}}">
    <link rel="icon" href="{{asset('favicon.png');}}" type="image/png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/app.js'])
</head>
<body>
    <div class="container-fluid bg-grad vh-100">
        <div id="navbar" class="row quintissential sticky-top">
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand col-1 ps-4 ps-md-5 mx-auto" href="/"><img id='favicon' src="{{asset('favicon.png');}}" alt=""></a>
                <div class="d-none d-lg-block offset-5"></div>
                <button class="navbar-toggler me-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col col-md-5 pe-4 text-center" id="navbarSupportedContent">
                    <form class="form-inline col-5 text-center mx-auto my-2 my-lg-0 d-flex" action="/catalog/search">
                        <input class="form-control me-sm-2" type="search" name="search" placeholder="Search" autocomplete="off">
                        <button class="btn my-2 my-sm-0 fs-3 p-0" type="submit">🔍</button>
                    </form>
                    @if (Auth::check())
                    <ul class="navbar-nav mx-auto col-4">
                        <li class="nav-item active">
                            <a class="nav-link fs-5" href="/">Inicio</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fs-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Perfil
                            </a>
                            <div class="dropdown-menu col-7 text-center mx-auto" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/stats">Estadisticas de Juego</a>
                                <a class="dropdown-item" href="/catalog/fav">Juegos Favoritos</a>
                                <a class="dropdown-item" href="/my-profile">Mi perfil</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="/logout">Salir</a>
                            </div>
                        </li>
                    </ul>
                    @else
                    <div class="row col-5">
                        <div class="col p-md-0 pe-md-1 text-center">
                            <a id="loginForm" class="nav-link">Iniciar Sesion</a>
                        </div>
                        <div class="col p-md-0 ps-md-1">
                            <a id="registerForm" class="nav-link">Registrarse</a>
                        </div>
                    </div>
                    @endif
                </div>
            </nav>
        </div>
        <dialog id="cerrarForm" style="z-index:999;" class="border-0 m-0 p-0 w-100 h-100 bg-transparent"></dialog>
        <dialog id="mostrarForm" style="z-index:1000;" class="mt-5 bg-grad mx-auto rounded-2 p-0"></dialog>
        {{$slot}}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    @vite(['resources/js/forms/authForms.js'])
</body>
</html>