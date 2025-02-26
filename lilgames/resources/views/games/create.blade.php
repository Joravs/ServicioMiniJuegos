<x-layout>
    <div id="form" class="rounded d-flex flex-column justify-content-center align-item-center mx-auto p-4 bg-grad">
    <form id="formRegister" class="row g-3 needs-validation" autocomplete="off" method="post" action="{{route('updateOrCreate');}}">
        @csrf
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div class="mb-3 col-12 text-center">
            <label for="nombreJuego" class="form-label text-white fs-5">Nombre del Juego</label>
            <input type="text" class="form-control" name="nombreJuego" id="nombreJuego" placeholder="Nombre Juego" required maxlength="100" required/>
        </div>
        <div class="mb-3 col-12 text-center">
            <label for="info" class="form-label text-white fs-5">Informacion del Juego</label>
            <input type="text" class="form-control" name="info" id="info" placeholder="Informacion" required maxlength="255" required/>
        </div>
        <div class="mb-3 col-12 text-center">
            <label for="tipo" class="form-label">Tipo de Juego</label>
            <select class="form-select form-select-lg" name="tipo" id="tipo">
                <option selected value="Tiempo">Tiempo</option>
                <option value="Puntos">Puntos</option>
            </select>
        </div>
        <button name="updateOrCreate" type="submit" class="btn btn-info btn-md">Crear o actualizar Juego</button>
    </form>
</div>
@vite(['resources/js/validations/validarPwd.js'])
@vite(['resources/js/validations/validarUsuario.js'])
</x-layout>