$(document).ready(()=>{$('.opacity-75').toArray().forEach((a)=>{
    if($(window).width() >= 768){
        $(a).removeClass('opacity-75');
    }
})});