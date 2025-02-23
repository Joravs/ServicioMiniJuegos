<x-layout>
    <div class="row">
        @foreach($gamesfav as $fav)
        <div class="card col m-2 border-white text-center">
            @if(Auth::check())
            @csrf
            <img src="{{asset('src/star.svg')}}" id='{{$game->idJuego;}}' name="{{$game->idJuego;}}" class="star">
            @endif
            <a href="{{route($fav->nombreJuego);}}">
                <img class="card-img-top juegos align-self-center img-fluid" src="{{asset('src/'.$fav->nombreJuego.'.png');}}" alt="{{route($fav->nombreJuego);}} Logo"/>
                <div class="card-body bg-white">
                    <h4 class="card-title titulos fs-5">{{$fav->nombreJuego}}</h4>
                    <p class="card-text textos d-none d-md-block">{{$fav->info}}</p>
                </div>
            </a>
        </div>
        @endforeach
    </div>
</x-layout>