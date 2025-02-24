const passwd=$("#passwd");
const pwdConf=$("#passwd-confirm");
const ayuda1=$("#passwordHelpInline1");
const ayuda2=$("#passwordHelpInline2");
const ayuda3=$("#passwordHelpInline3");
const form=$("#formRegister");
const validarPwd=()=>{
    const feedback=$("#pwd-confirm-feedback");
    if(passwd.val()!=pwdConf.val()){
        feedback.removeClass("d-none");
        pwdConf.addClass("is-invalid");
    } else {
        feedback.addClass("d-none");
        pwdConf.removeClass("is-invalid");
        pwdConf.addClass("is-valid");
    }
}
const validarPwd1=()=>{
    let bolean1=false;
    let bolean2=false;
    let bolean3=false;

    if (passwd.val().length < 8) {
        bolean1 = true;
        ayuda1.removeClass("d-none");
    } else {
        ayuda1.addClass("d-none");
    }
    if (passwd.val().search(/[A-Z]/) == -1) {
        bolean2 = true;
        ayuda2.removeClass("d-none");
    } else {
        ayuda2.addClass("d-none");
    }
    // Verificar números
    if (passwd.val().search(/[0-9]/) == -1) {
        bolean3 = true;
        ayuda3.removeClass("d-none");
    } else {
        ayuda3.addClass("d-none");
    }
    if (bolean1 || bolean2 || bolean3) {
        passwd.addClass("is-invalid").removeClass("is-valid");
    } else {
        passwd.removeClass("is-invalid").addClass("is-valid");
    }
}

const cargarEvento=()=>{
    pwdConf.on("input", validarPwd);
    passwd.on("input", validarPwd1);
    form.on("submit", function(e){
        e.preventDefault();
        if(passwd.val()==pwdConf.val()){
            if($('#username').hasClass('is-valid'))
                {this.submit()}
        }
    });
}
$(document).ready(cargarEvento);