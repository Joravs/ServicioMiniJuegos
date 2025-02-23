<x-layout>
    <div class="row">
        @foreach($games as $game)
        <div class="card col m-2 border-white text-center">
            @if(Auth::check())
            @csrf
            <img src="{{asset('src/star.svg')}}" id='{{$game->idJuego;}}' name="{{$game->idJuego;}}" class="star">
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
    <script>
        const controlFavURL = "{{route('controlFav');}}";
    </script>
    @vite(['resources/js/validations/fav.js'])
</x-layout>