<x-layout>
    <div id="form" class="rounded d-flex flex-column justify-content-center align-item-center mx-auto p-3" style="width: 50rem; padding-top:20vh;">
        <form class="row g-3 needs-validation" autocomplete="off" method="post" action="{{route('create');}}">
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
                <label for="nombre" class="form-label text-white fs-5">Nombre Completo</label>
                <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre" required maxlength="15" required/>
            </div>
            <div class="mb-3 col-12 text-center">
                <label for="username" class="form-label text-white fs-5">Usuario</label>
                <input type="text" class="form-control" name="username" id="username" placeholder="Nombre de Usuario" required maxlength="15"required/>
            </div>
            <span id="passwordHelpInline0" class="form-text text-white invalid d-none">
                    Nombre de Usuario no disponible
            </span>
            <div class="mb-3 col-6 text-center">
                <label for="passwd" class="form-label text-white fs-5">Contraseña</label>
                <input type="password" class="form-control" name="passwd" id="passwd" placeholder="Contraseña" required minlength="8" maxlength="25"required/>
                <span id="passwordHelpInline1" class="form-text text-white">
                    Debe tener una longitud de 8 a 20 caracteres.
                </span><br>
                <span id="passwordHelpInline2" class="form-text text-white">
                    Debe tener una mayuscula.
                </span><br>
                <span id="passwordHelpInline3" class="form-text text-white">
                    Debe tener un numero.
                </span>
            </div>
            <div class="mb-3 col-6 text-center">
                <label for="passwd-confirm" class="form-label text-white fs-5">Confirmar Contraseña</label>
                <input type="password" class="form-control" name="passwd-confirm" id="passwd-confirm" placeholder="Confirmar Contraseña" required minlength="8" maxlength="25"required/>
                <span id="pwd-confirm-feedback" class="d-none invalid">
                    Las contraseñas no coinciden.
                </span>
            </div>
            <button name="register" type="submit" class="btn btn-info btn-md">Registrarse</button>
        </form>
    </div>
    @vite(['resources/js/validations/validarPwd.js'])
</x-layout>