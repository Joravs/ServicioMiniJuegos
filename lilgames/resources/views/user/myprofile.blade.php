<x-layout>
    <div class="row">
        <div class="row text-center mt-5 pt-3">
            <p class="titulos fs-3">{{$user->nombre}}</p>
                <span class="offset-1"></span>
            <span class="titulos fs-4">Nivel : <span class='textos'>{{$user->nivel}}</span></span>
        </div>
        <div class="row text-center mt-5 pt-3">
            <p class="fs-3 titulos">Nickname : <span class="textos">{{$user->username}}</span></p>
        </div>
    </div>
</x-layout>