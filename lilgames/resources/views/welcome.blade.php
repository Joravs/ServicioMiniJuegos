<x-layout>
    <div class="row">
        @foreach($games as $game)
        <div class="card col m-2 border-white text-center">
            @if(Auth::check())
            @csrf
            <svg id='{{$game->idJuego;}}' name="{{$game->idJuego;}}" class="star" xmlns="http://www.w3.org/2000/svg" class="z-5" viewBox="0 0 100 100" width="64px">
                <polygon points="50,5 63,38 98,38 69,59 82,92 50,71 18,92 31,59 2,38 37,38" fill="currentColor" stroke="black" stroke-width="3"/>
            </svg>
            @endif
            <a href="{{route($game->nombreJuego);}}">
                <img class="card-img-top juegos align-self-center img-fluid" src="{{asset('src/'.$game->nombreJuego.'.png');}}" alt="{{$game->nombreJuego;}} Logo"/>
                <div class="card-body bg-white">
                    <h4 class="card-title titulos fs-5">{{$game->nombreJuego}}</h4>
                    <p class="card-text textos d-none d-md-block">{{$game->info}}</p>
                </div>
            </a>
        </div>
        @endforeach
    </div>
    @vite(['resources/js/validations/fav.js'])
</x-layout>