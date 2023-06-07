
/*

 _______         ___
|_     _|.-----.'  _|.-----.-----.
 _|   |_ |     |   _||  _  |__ --|
|_______||__|__|__|  |_____|_____|
                       __
.--------.--.--.-----.|__|.-----.--.--.-----.
|        |  |  |__ --||  ||  _  |  |  |  -__|
|__|__|__|_____|_____||__||__   |_____|_____|
                             |__|

 */


$('#tabrecherche').on('click', '.infosmusique', () =>
    {

        let idmusique = $(event.target).closest('.infosmusique').attr('value');
        //console.error(idmusique);
        ajaxRequest('GET', 'php/request.php/infosMusique', musiqueModal, 'idmusique='+idmusique);
    }
);

$('#display2').on('click', '.infosmusique', () =>
    {

        let idmusique = $(event.target).closest('.infosmusique').attr('value');
        //console.error(idmusique);
        ajaxRequest('GET', 'php/request.php/infosMusique', musiqueModal, 'idmusique='+idmusique);
    }
);

function musiqueModal(infos) {
    let temps = parseSeconds(infos['temps_musique'] / 1000);
    $('#modalMusiqueTitle').html(infos['titre_musique']);
    $('#modalMusiqueInner').html('<p class="info"> Nom Artiste : '+ infos['nom_artiste'] +' </p>' +
                                        '<p class="info"> Nom Album : '+ infos['titre_album'] +' </p>' +
                                        '<p class="info"> Temps Musique : '+ temps +' min </p>');

}

/*

 _______         ___                         __ __
|_     _|.-----.'  _|.-----.-----.   .---.-.|  |  |--.--.--.--------.
 _|   |_ |     |   _||  _  |__ --|   |  _  ||  |  _  |  |  |        |
|_______||__|__|__|  |_____|_____|   |___._||__|_____|_____|__|__|__|

 */

$('#tabrecherche').on('click', '.infosalbum', () =>
    {

        let idalbum = $(event.target).closest('.infosalbum').attr('value');
        console.error(idalbum);
        ajaxRequest('GET', 'php/request.php/infosAlbum', albumModal, 'idalbum='+idalbum);
    }
);

function albumModal(infos) {

    let crea = infos[0]['date_album'].substr(0,10);

    $('#modalMusiqueTitle').html(infos[0]['titre_album']);
    $('#modalMusiqueInner').html('<p class="info"> Nom Artiste : '+ infos[0]['nom_artiste'] +' </p>' +
        '<p class="info"> Date : '+ crea +' </p>' +
        '<p class="info"> Genre : '+ infos[0]['genre_album'] +' </p>');

}