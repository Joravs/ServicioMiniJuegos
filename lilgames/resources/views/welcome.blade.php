<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Administracion de Insulina</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/style.css');}}">
</head>
<body>
    <div class="container-fluid font-ratushy bg-grad vh-100">
        <x-navbar></x-navbar>
        <div class="row">
            @foreach($games as $game)
                <div class="card col">
                    <img class="card-img-top" src="holder.js/100x180/" alt="Card image cap"/>
                    <div class="card-body">
                        <h4 class="card-title">{{$game->nombreJuego}}</h4>
                        <p class="card-text">{{$game->info}}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>