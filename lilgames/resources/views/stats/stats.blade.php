<x-layout>
    <div id="Carrusel" class="row mx-auto">
        <div id="carouselIdPoints" class="carousel slide my-5" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                @foreach($statsControlPuntos['statsPuntos'] as $index => $statsPoints)
                    <li data-bs-target="#carouselIdPoints" data-bs-slide-to="{{ $index }}" class="{{ $index === 0 ? 'active' : '' }}" aria-current="{{ $index === 0 ? 'true' : 'false' }}" aria-label="Slide {{ $index + 1 }}"></li>
                @endforeach
            </ol>
            <div class="carousel-inner" role="listbox">
                @foreach($statsControlPuntos['statsPuntos'] as $index => $statsPoints)
                    <div class="carousel-item {{ $index === 0 ? 'active' : '' }}">
                        <img src="{{ asset('src/'.$statsPoints->nombreJuego.'.png') }}" class="mx-auto d-block juegos" alt="{{ $statsPoints->nombreJuego }} Logo"/>
                        <div class="carousel-caption d-none d-md-block text-start">
                            <h3 class="titulos fs-4">{{ $statsPoints->nombreJuego }}</h3>
                            <p class="textos">Partidas Jugadas: {{$statsPoints->partidasJugadas}}</p>
                            <p class="textos">Record Puntos: {{ $statsPoints->recordPoints }}</p>
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
                    @foreach($statsControlTime['statsTiempo'] as $index => $statsTiempo)
                        <li data-bs-target="#carouselIdTime" data-bs-slide-to="{{ $index }}" class="{{ $index === 0 ? 'active' : '' }}" aria-current="{{ $index === 0 ? 'true' : 'false' }}" aria-label="Slide {{ $index + 1 }}"></li>
                    @endforeach
                </ol>
                <div class="carousel-inner" role="listbox">
                    @foreach($statsControlTime['statsTiempo'] as $index => $statsTiempo)
                        <div class="carousel-item {{ $index === 0 ? 'active' : '' }}">
                            <img src="{{ asset('src/'.$statsTiempo->nombreJuego.'.png') }}" class="mx-auto d-block juegos" alt="{{ $statsTiempo->nombreJuego }} Logo"/>
                            <div class="carousel-caption d-none d-md-block text-end">
                                <h3 class="titulos fs-4">{{ $statsTiempo->nombreJuego }}</h3>
                                <p class="textos">Partidas Jugadas: {{$statsTiempo->partidasJugadas}}</p>
                                <p class="textos">Record Tiempo: {{ $statsTiempo->recordTime }}</p>
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
        </div>
    </div>
</x-layout>