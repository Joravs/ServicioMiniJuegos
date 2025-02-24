$(document).ready(function() {    
    $('.star').toArray().forEach((e) => {
        $(e).on('click', function() {
            let gameId = $(this).attr('id');
            let token = $('input[type="hidden"]').attr('value');
            $.ajax({
                url: '/catalog/fav/control',
                method: 'POST',
                data: {
                    idJuego: gameId,
                    _token: $('meta[name="csrf-token"]').attr('content'),
                }
            });
        });
    });
});