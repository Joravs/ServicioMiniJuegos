const loginForm = $('#loginForm');
const registerForm = $('#registerForm');
const mostrarForm = $('#mostrarForm');
const cerrarForm = $('#cerrarForm');

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
            }
        });
    });
    cerrarForm.on('click', ()=>{
        mostrarForm.hide();
        cerrarForm.hide();
    });
}

$(document).ready(formularios);