<x-layout>
    <div class="row">
        @if(Auth::check())
            @php
                $color = 'transparent';
                $idJuego = []; // Inicializar el array
            @endphp
            @foreach($gamesFav as $fav)
                @foreach($fav as $key)
                    @if($key['idJuego'])
                        @php
                            $idJuego[$key['idJuego']] = $key['idJuego'];
                        @endphp
                    @endif
                @endforeach
            @endforeach
            @foreach($games as $game)
                @php
                    $color = in_array($game->idJuego, $idJuego) ? 'yellow' : 'transparent'; // Asignar color según la existencia en $idJuego
                @endphp
                <div class="card col m-2 border-white text-center">
                    <svg id="{{ $game->idJuego }}" name="{{ $game->idJuego }}" class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="64px">
                        <polygon points="50,5 63,38 98,38 69,59 82,92 50,71 18,92 31,59 2,38 37,38" fill="{{ $color }}" stroke="black" stroke-width="3"/>
                    </svg>
                    <a href="{{ route($game->nombreJuego) }}">
                        <img class="card-img-top juegos align-self-center img-fluid" src="{{ asset('src/'.$game->nombreJuego.'.png') }}" alt="{{ $game->nombreJuego }} Logo"/>
                        <div class="card-body bg-white">
                            <h4 class="card-title titulos fs-5">{{ $game->nombreJuego }}</h4>
                            <p class="card-text textos d-none d-md-block">{{ $game->info }}</p>
                        </div>
                    </a>
                </div>
            @endforeach
        @endif
    </div>
    @vite(['resources/js/validations/star.js'])
</x-layout>