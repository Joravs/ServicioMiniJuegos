const start = () => {
    let star = $('.star').toArray()
    star.forEach((e) => {
        if($('#contenido').length){
            $(e).css('color','gold');
        }
        $(e).on('click', function() {
            let gameId = $(this).attr('id');
            $.ajax({
                url: '/catalog/fav/control/'+gameId,
                method: 'POST',
                data: {_token: $('meta[name="csrf-token"]').attr('content')},
                success: (response) => {
                    if(response){
                        $(e).css('color','transparent');
                    }else{
                        $(e).css('color','gold');
                    }
                    location.reload();
                }
            });
        });
    });
    $('#btnlog').on('click',()=>{$('#log').addClass('d-none')});
}
export default start;
$(document).ready(start);