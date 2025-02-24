<x-layout>
    <div class="row">
        @if(Auth::check())
        <button id="facil">Facil</button>
        <button id="medio">Medio</button>
        <button id="dificil">Dificil</button>
        @endif
    </div>
</x-layout>