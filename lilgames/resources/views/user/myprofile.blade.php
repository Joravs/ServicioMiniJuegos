<x-layout>
    <div class="row">
        <div class="col-4 text-center mt-5 pt-3">
            <p class="titulos fs-3">{{$user->nombre}}</p>
            <p class="fs-3 titulos">Nickname : <span class="textos">{{$user->username}}</span></p>
            
        </div>
        <div class="col-8 text-center mt-5 pt-3">
            <span class="titulos fs-4">Nivel : <span class='textos'>{{$user->nivel}}</span></span>
            <div>
                <h5>Exp. : </h5>
                <div class="titulos fs-6" style="min-width:10vw; border:2px solid black;"><span class='textos m-0' style="width:100%; background-color:red;">{{$user->xp}}/XP para siguiente nivel</span></div>
            </div>
        </div>
    </div>
</x-layout>