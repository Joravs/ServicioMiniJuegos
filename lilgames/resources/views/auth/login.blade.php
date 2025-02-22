<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Administracion de Insulina</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container-fluid font-ratushy bg-secondary vh-100">
        <div id="form" class="rounded d-flex flex-column justify-content-center align-item-center mx-auto p-4" style="width: 22rem; padding-top:30vh;">
        @if (session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
        @endif
            <form class="row g-3 needs-validation opacity-100 " method="post" action="{{route('validate');}}" autocomplete="off">
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
            <a id="linkreg" href="{{route('register');}}" class="text-center mt-3">¿No estas registrado? Click aqui</a>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>