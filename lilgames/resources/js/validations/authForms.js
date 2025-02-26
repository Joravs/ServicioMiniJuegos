const loginForm = $('#loginForm');
const registerForm = $('#registerForm');
const mostrarForm = $('#mostrarForm');
const cerrarForm = $('#cerrarForm');
const body = $('#contenido');

const formularios = () =>{
    loginForm.on('click', ()=>{
        $.ajax({
            url: '/loginForm',
            method: 'GET',
            success: (response) => {
                mostrarForm.empty();
                mostrarForm.append(response);
                cerrarForm.show();
                mostrarForm.show();
                body.css('filter', 'blur(5px)');
                $('body,html').css('overflow', 'hidden');
                mostrarForm.css('filter', 'none');
            }
        });
    });
    registerForm.on('click', ()=>{
        $.ajax({
            url: '/registerForm',
            method: 'GET',
            success: (response) => {
                mostrarForm.empty();
                mostrarForm.append(response);
                cerrarForm.show();
                mostrarForm.show();
<<<<<<< HEAD
		body.css('filter','blur(5px)');
                body.css('overflow', 'hidden');
=======
                $('body,html').css('overflow', 'hidden');
>>>>>>> 330f93fe66822644fd5fa60542826305e83a0e38
                mostrarForm.css('filter', 'none');
            }
        });
    });
    cerrarForm.on('click', ()=>{
        mostrarForm.hide();
        cerrarForm.hide();
        body.css('filter', 'none');
        body.css('overflow', 'auto');
    });
}

$(document).ready(formularios);
