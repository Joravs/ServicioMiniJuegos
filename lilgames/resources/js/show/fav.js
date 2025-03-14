import start from './star.js';

const show = (gamesfav) => {
    gamesfav = gamesfav.gamesfav;
            const content = $('#contenido');
            gamesfav.forEach((game) => {
                let card = $('<div class="card col-sm-5 col-md my-3 border-white text-center bg-prpl">');
                let svg = $('<svg id="'+game.idJuego+'" name="'+game.idJuego+'" class="star" xmlns="http://www.w3.org/2000/svg" class="z-5" viewBox="0 0 100 100" width="64px"><polygon points="50,5 63,38 98,38 69,59 82,92 50,71 18,92 31,59 2,38 37,38" fill="currentColor" stroke="black" stroke-width="3"/></svg>');
                card.append(svg)
                card.append('<a href="/catalog/'+game.nombre+'"><img class="card-img-top juegos align-self-center img-fluid" src="'+baseUrl+'/'+game.nombre+'.png" alt="'+game.nombre+' Logo"/><div class="card-body bg-prpl"><h4 class="card-title titulos fs-5 text-white">'+game.nombre+'</h4><p class="card-text textos d-none d-md-block">'+game.info+'</p></div></a></div>');
                content.append(card);
            });
}
$(document).ready(()=> {
    $.ajax({
        url: '/catalog/fav',
        method: 'POST',
        data: {_token: $('meta[name="csrf-token"]').attr('content')},
        success: (gamesfav) => {
            show(gamesfav);
            start();
        }
    });
});