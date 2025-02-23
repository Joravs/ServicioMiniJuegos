$(document).ready(function() {    
    $('.star').toArray().forEach((e) => {
        $(e).on('click', function() {
            let gameId = $(this).attr('id');
            let token = $('input[type="hidden"]').attr('value');
            $.ajax({
                url: controlFavURL,
                method: 'POST',
                data: {
                    idJuego: gameId,
                    _token: token
                }
            });
        });
    });
});