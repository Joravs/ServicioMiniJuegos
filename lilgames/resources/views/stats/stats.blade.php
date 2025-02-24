<x-layout>
    <div id="Carrusel" class="row mx-auto">
        @if(Auth::check())
        <div id="carouselIdPoints" class="carousel slide my-5" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#carouselIdPoints" data-bs-slide-to="0" class="active" aria-current="true"aria-label="First slide"></li>
                <li data-bs-target="#carouselIdPoints" data-bs-slide-to="1" aria-label="Second slide"></li>
                <li data-bs-target="#carouselIdPoints" data-bs-slide-to="2"aria-label="Third slide"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
            @foreach($statsControlPuntos['statsPuntos'] as $statsPoints) 
                <div class="carousel-item active">
                    <img src="{{ asset('src/'.$statsPoints->nombreJuego.'.png') }}" class="mx-auto d-block juegos" alt="{{ $statsPoints->nombreJuego }} Logo"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h3>{{ $statsPoints->nombreJuego }}</h3>
                        <p>Partidas Jugadas: {{$statsPoints->partidasJugadas}}</p>
                        <p>Record Puntos: {{ $statsPoints->recordPoints }}</p>
                    </div>
                </div>
            @endforeach
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselIdPoints" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselIdPoints" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div id="carouselIdTime" class="carousel slide my-5" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#carouselIdTime" data-bs-slide-to="0" class="active" aria-current="true"aria-label="First slide"></li>
                <li data-bs-target="#carouselIdTime" data-bs-slide-to="1" aria-label="Second slide"></li>
                <li data-bs-target="#carouselIdTime" data-bs-slide-to="2"aria-label="Third slide"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
            @foreach($statsControlTime['statsTiempo'] as $statsTime)
                <div class="carousel-item active">
                    <img src="{{ asset('src/'.$statsTime->nombreJuego.'.png') }}" class="mx-auto juegos d-block" alt="{{$statsTime->partidasJugadas}} Logo"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h3>{{$statsTime->nombreJuego}}</h3>
                        <p>Partidas Jugadas: {{$statsTime->partidasJugadas}}</p>
                        <p>Record Puntos: {{ $statsTime->recordTime }}</p>
                    </div>
                </div>
            @endforeach
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselIdTime" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselIdTime" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        @endif
    </div>
</x-layout>