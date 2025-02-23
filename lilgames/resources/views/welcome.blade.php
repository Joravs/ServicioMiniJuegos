<x-layout>
    <div class="row">
        @foreach($games as $game)
        <a href="{{route($game->nombreJuego);}}">
            <div class="card col">
                <img class="card-img-top juegos" src="{{asset('src/'.$game->nombreJuego.'.png');}}" alt="Buscaminas Logo"/>
                <div class="card-body">
                    <h4 class="card-title">{{$game->nombreJuego}}</h4>
                    <p class="card-text">{{$game->info}}</p>
                </div>
            </div>
        </a>
        @endforeach
    </div>
</x-layout>