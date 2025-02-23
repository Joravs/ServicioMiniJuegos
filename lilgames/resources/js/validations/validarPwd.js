const passwd=$("passwd");
const pwdConf=$("passwd-confirm");
const ayuda1=$("passwordHelpInline1");
const ayuda2=$("passwordHelpInline2");
const ayuda3=$("passwordHelpInline3");
const validarPwd=()=>{
    const feedback=$("pwd-confirm-feedback");
    if(passwd.value!=pwdConf.value){
        feedback.classList.remove("d-none");
        pwdConf.classList.add("is-invalid");
    } else {
        feedback.classList.add("d-none");
        pwdConf.classList.remove("is-invalid");
        pwdConf.classList.add("is-valid");
    }
}
const validarPwd1=()=>{
    let bolean1=false;
    let bolean2=false;
    let bolean3=false;
    passwd.value.length<8?bolean1=true:ayuda1.classList.add("d-none");
    passwd.value.search(/[A-Z]/)==-1?bolean2=true:ayuda2.classList.add("d-none");
    passwd.value.search(/[0-9]/)==-1?bolean3=true:ayuda3.classList.add("d-none");
    if(bolean1 || bolean2 || bolean3){
        passwd.classList.add("is-invalid");
    }else{
        passwd.classList.remove("is-invalid");
        passwd.classList.add("is-valid");
    }
}

const cargarEvento=()=>{
    pwdConf.on("input", validarPwd);
    passwd.on("input", validarPwd1);
}
$(document).ready(cargarEvento);