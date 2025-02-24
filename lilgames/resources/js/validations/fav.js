$(document).ready(function() {    
    $('.star').toArray().forEach((e) => {
        $(e).on('click', function() {
            let gameId = $(this).attr('id');
            let token = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                url: '/catalog/fav/control/'+gameId,
                method: 'POST',
                data: {
                    _token: token,
                }
            });
        });
    });
});