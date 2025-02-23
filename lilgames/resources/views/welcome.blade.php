<x-layout>
    <div class="row">
        @foreach($games as $game)
        <div class="card col m-2 border-white text-center">
            <a href="{{route($game->nombreJuego);}}">
                <img class="card-img-top juegos align-self-center img-fluid" src="{{asset('src/'.$game->nombreJuego.'.png');}}" alt="{{route($game->nombreJuego);}} Logo"/>
                <div class="card-body bg-white">
                    <h4 class="card-title titulos fs-5">{{$game->nombreJuego}}</h4>
                    <p class="card-text textos d-none d-md-block">{{$game->info}}</p>
                </div>
            </a>
        </div>
        @endforeach
    </div>
</x-layout>