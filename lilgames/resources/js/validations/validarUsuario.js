const username=$("#username");

const validarUsuario=()=>{
    $.ajax({
        url: "/user/check/"+username.val(),
        method: "get",
        success: (response) => {
            if(response){
                username.removeClass("is-valid");
                username.addClass("is-invalid");
            } else {
                username.removeClass("is-invalid");
                username.addClass("is-valid");
            }
        }
    });
}

const cargar=()=>{
    username.on("change", validarUsuario);
}
$(document).ready(cargar);