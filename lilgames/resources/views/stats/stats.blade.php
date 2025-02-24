<x-layout>
    <div class="row">
        @if(Auth::check())
        @foreach($statsControlPuntos['statsPuntos'] as $statsPoints)
        <div class="row my-2">
            <div class="card col-6 m-2 border-white text-center">
                <a href="{{ route($statsPoints->nombreJuego) }}">
                    <img class="card-img-top juegos align-self-center img-fluid" src="{{ asset('src/'.$statsPoints->nombreJuego.'.png') }}" alt="{{ $statsPoints->nombreJuego }} Logo"/>
                    <div class="card-body bg-white">
                        <h4 class="card-title titulos fs-5">{{ $statsPoints->nombreJuego }}</h4>
                    </div>
                </a>
            </div>
            <div class="row col-6">
                <table class="bg-light rounded-2">
                    <thead>
                        <tr>
                            <th>Partidas Jugadas</th>
                            <th>Record Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{$statsPoints->partidasJugadas}}</td>
                            <td>{{ $statsPoints->recordPoints }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        @endforeach
    </div>
    <div class="row">
        @foreach($statsControlTime['statsTiempo'] as $statsTime)
            <div class="row my-2">
                <div class="card col-6 m-2 border-white text-center">
                    <a href="{{ route($statsTime->nombreJuego) }}">
                        <img class="card-img-top juegos align-self-center img-fluid" src="{{ asset('src/'.$statsTime->nombreJuego.'.png') }}" alt="{{ $statsTime->nombreJuego }} Logo"/>
                        <div class="card-body bg-white">
                            <h4 class="card-title titulos fs-5">{{ $statsTime->nombreJuego }}</h4>
                        </div>
                    </a>
                </div>
                <div class="row col-6">
                    <table class="bg-light rounded-2">
                        <thead>
                            <tr>
                                <th>Partidas Jugadas</th>
                                <th>Record Tiempo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{$statsTime->partidasJugadas}}</td>
                                <td>{{ $statsTime->recordTime }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        @endforeach
        @endif
    </div>
</x-layout>