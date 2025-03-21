<div id="form" class="rounded d-flex flex-column justify-content-center align-item-center mx-auto p-4 bg-grad">
@if (session('message'))
    <div class="alert alert-info">
        {{ session('message') }}
    </div>
@endif
    <form class="row g-3 needs-validation opacity-100 " method="post" action="/loginForm" autocomplete="off">
        @csrf
        <div class="mb-3 row-12 text-center">
            <label for="username" class="form-label text-white fs-5">Usuario</label>
            <input type="text" class="form-control" name="username" id="username" placeholder="Username" required/>
        </div>
        <div class="mb-3 row-12 text-center">
            <label for="passwd" class="form-label text-white fs-5">Contraseña</label>
            <input type="password" class="form-control" name="passwd" id="passwd" placeholder="Password" required/>
        </div>
        <button name="login" type="submit" class="btn btn-info btn-md">Iniciar Sesion</button>
    </form>
    <a id="linkreg" href="/registerForm" class="text-center mt-3">¿No estas registrado? Click aqui</a>
</div>