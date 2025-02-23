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
</head>
<body>
    <div class="container-fluid bg-grad vh-100">
        <div id="navbar" class="row quintissential sticky-top">
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand col-1 ps-4 ps-md-5 mx-auto" href="{{route('index');}}"><img id='favicon' src="{{asset('favicon.png');}}" alt=""></a>
                <div class="d-none d-lg-block offset-5"></div>
                <button class="navbar-toggler me-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col col-md-5 ms-md-5 px-4 text-center" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link fs-5" href="{{route('index');}}">Inicio</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle fs-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Perfil
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            @if (Auth::check())
                            <a class="nav-link" href="{{route('stats');}}">Estadisticas de Juego</a>
                            <a class="dropdown-item" href="{{route('favs');}}">Juegos Favoritos</a>
                            <a class="dropdown-item" href="{{route('myprofile');}}">Mi perfil</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="{{route('logout');}}">Salir</a>
                            @else
                            <a class="dropdown-item" href="{{route('login');}}">Iniciar Sesion</a>
                            <a class="dropdown-item" href="{{route('register');}}">Registrarse</a>
                            @endif
                        </div>
                    </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0 d-flex" action="{{route('search');}}">
                        <input class="form-control mr-sm-2 placeholder" type="search" name="search" placeholder="Search" aria-label="Search">
                        <button class="btn my-2 my-sm-0 fs-3" type="submit">🔍</button>
                    </form>
                </div>
            </nav>
        </div>
        {{$slot}}
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>