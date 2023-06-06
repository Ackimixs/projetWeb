/*

 ______              __                     __
|   __ \.-----.----.|  |--.-----.----.----.|  |--.-----.
|      <|  -__|  __||     |  -__|   _|  __||     |  -__|
|___|__||_____|____||__|__|_____|__| |____||__|__|_____|

 */

'use strict';

/*

 ______                           __                     __
|   __ \.-----.-----.--.--.-----.|  |_.-----.    .---.-.|__|.---.-.--.--.
|      <|  -__|  _  |  |  |  -__||   _|  -__|    |  _  ||  ||  _  |_   _|
|___|__||_____|__   |_____|_____||____|_____|    |___._||  ||___._|__.__|
                 |__|                                  |___|

*/

$('#musique').click((e) =>
    {
        e.preventDefault();
        let stringrecherche = '';
        stringrecherche = document.getElementById('stringrecherche').value;
        //console.log('button musique : '+stringrecherche);
        ajaxRequest('GET', '../php/request.php/recherchemusique', rechercheMusique, 'stringrecherche='+stringrecherche);
    }
);

$('#playlist').click((e) =>
    {
        e.preventDefault();
        let stringrecherche = '';
        stringrecherche = document.getElementById('stringrecherche').value;
        ajaxRequest('GET', '../php/request.php/rechercheplaylist', recherchePlaylist, 'stringrecherche='+stringrecherche);
    }
);

$('#album').click((e) =>
    {
        e.preventDefault();
        let stringrecherche = '';
        stringrecherche = document.getElementById('stringrecherche').value;
        ajaxRequest('GET', '../php/request.php/recherchealbum', rechercheAlbum, 'stringrecherche='+stringrecherche);
    }
);

$('#artiste').click((e) =>
    {
        e.preventDefault();
        let stringrecherche = '';
        stringrecherche = document.getElementById('stringrecherche').value;
        ajaxRequest('GET', '../php/request.php/rechercheartiste', rechercheArtiste, 'stringrecherche='+stringrecherche);
    }
);

/*

 _______                    __   __
|    ___|.-----.-----.----.|  |_|__|.-----.-----.
|    ___||  _  |     |  __||   _|  ||  _  |     |
|___|    |_____|__|__|____||____|__||_____|__|__|

        ___   ___ __        __
.---.-.'  _|.'  _|__|.----.|  |--.---.-.-----.-----.
|  _  |   _||   _|  ||  __||     |  _  |  _  |  -__|
|___._|__|  |__| |__||____||__|__|___._|___  |_____|
                                       |_____|

*/

function rechercheMusique(musiques){

    document.querySelector('#display2').hidden = false;

    $('#display2').html("");

    if(musiques === 'Musique introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<div class="alert alert-danger" role="danger" style="width: 140%">\n' +
                                    ' Désolé je ne trouve pas ta musique ! ' +
                                    '</div>');
    }
    else {
        $('#tabrecherche').html("");
        for (let i=0 ; i < musiques.length ; i++) {
            $('#tabrecherche').append('<li class="songItem" data-id="' + musiques[i]['id_musique'] + '">'
                                        + '<span>'+ (i+1) +'</span>'
                                        + '<img src="'+ musiques[i]['image_album']+'"/>'
                                        + '<h5>' + musiques[i]['titre_musique']
                                            + '<div class="subtitle"> '+ musiques[i]['nom_artiste'] +'</div>'
                                            + '<div id = "heart" class="rechercheMusqiueHeart" data-id="' + musiques[i]['id_musique'] + '" data-liked="0">'
                                                + '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">\n'
                                                + '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>\n'
                                                + '</svg>'
                                            + '</div>'
                                            + '<button type="button" class="btn btn-primary infosmusique btn-light mb-2" data-toggle="modal" data-target="#modalMusique" value="'+ musiques[i]['id_musique'] +'"> INFOS'
                                            + '</button> '
                                        + '</h5>'
                                    + '</li>');
        }
    }

    let songItem = document.querySelectorAll(".songItem");
    songItem.forEach(e => {
        e.addEventListener('click', () => {
            playSong(e.dataset.id);
        })
    })

    let heart = document.querySelectorAll('.rechercheMusqiueHeart')
    heart.forEach(e => {
        ajaxRequest("GET", '../php/request.php/like/' + e.dataset.id, (d) => {
            if (d) {
                e.children[0].children[0].setAttribute('d', 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z');
                e.dataset.liked = '1';
            }
        })


        e.addEventListener('click', (event) => {
            event.stopPropagation();
            if (e.dataset.liked === '0') {
                e.dataset.liked = '1';
                ajaxRequest('POST', '../php/request.php/like', (d) => {
                    console.log(d);
                    e.children[0].children[0].setAttribute('d', 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z');

                },`id=${e.dataset.id}`)
            } else if (e.dataset.liked === '1') {
                e.dataset.liked = '0';
                ajaxRequest('DELETE', '../php/request.php/like/' + e.dataset.id, (d) => {
                    console.log(d);
                    e.children[0].children[0].setAttribute('d', 'm8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z');
                })
            }
        })
    })
}

function recherchePlaylist(playlists){

    document.querySelector('#display2').hidden = false;

    $('#display2').html("");

    if(playlists === 'Playlist introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<div class="alert alert-danger" role="danger" style="width: 140%">\n' +
                                    ' Désolé je ne trouve pas ta playlist, mais je te conseille de faire la tiennes !' +
                                    '</div>');
    }
    else {
        $('#tabrecherche').html("");
        for(let i=0; i < playlists.length; i++) {
            console.log(playlists[i]);
            $('#tabrecherche').append('<li class="songItem" data-id="' + playlists[i]['id_playlist'] + '">'
                                        + '<span>'+ (i+1) +'</span>'
                                        + '<img src="'+ (playlists[i]['image_playlist'] ? playlists[i]['image_playlist'] : '../photo/img.png') + '"/>'
                                        + '<h5>' + playlists[i]['titre_playlist']
                                            + '<div class="subtitle"> '+ (playlists[i]['nom_user'] ?? '') +' </div>'
                                            + '</button> '
                                        + '</h5>'
                                    + '</li>');
        }
    }

    document.querySelectorAll('.songItem').forEach(e => {
        e.addEventListener('click', () => {
            console.log(e.dataset.id);
            afficherInfoPlaylist('playlist', parseInt(e.dataset.id, 10))
            showPlaylistInfo();
        })
    })
}

function rechercheAlbum(albums){

    document.querySelector('#display2').hidden = false;

    $('#display2').html("");

    if(albums === 'Album introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<div class="alert alert-danger" role="danger" style="width: 140%">\n' +
                                    ' Désolé je ne trouve pas ton album !' +
                                    '</div>');
    }
    else {
        $('#tabrecherche').html("");
        for (let i=0 ; i < albums.length ; i++) {
            $('#tabrecherche').append('<li class="songItem">'
                                        + '<span>'+ (i+1) +'</span>'
                                        + '<img src="'+ albums[i]['image_album']+'"/>'
                                        + '<h5> <button  class="clicAlbum" value="'+ albums[i]['id_album'] +'" >' + albums[i]['titre_album']
                                            + ' </button> <div class="subtitle"> '+ albums[i]['nom_artiste'] +' </div>'
                                            + '<button type="button" class="btn btn-primary infosalbum btn-light mb-2" data-toggle="modal" data-target="#modalMusique" value="'+ albums[i]['id_album'] +'" > INFOS'
                                            + '</button> '
                                        + '</h5>'
                                    + '</li>');
        }
    }
}

function rechercheArtiste(artistes){

    document.querySelector('#display2').hidden = false;

    $('#display2').html("");

    if(artistes === 'Artiste introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<div class="alert alert-danger" role="danger" style="width: 140%">\n' +
                                    ' Désolé je ne trouve pas ton artiste ! <br> - TOC TOC <br> - Qui est là ? <br> - Amina <br> - Amina qui ? <br> - Amina mina hé hé, waka waka hé hééé...' +
                                    '</div>');
    }
    else {
        $('#tabrecherche').html("");
        for (let i=0; i < artistes.length; i++) {
            $('#tabrecherche').append('<li class="songItem">'
                                            + '<span>'+ (i+1) +'</span>'
                                            + '<img src="'+ (artistes[i]['image_artiste'] ? artistes[i]['image_artiste'] : '../photo/img.png') + '"/>'
                                            + '<h5> <button  class="clicArtiste" value="'+ artistes[i]['id_artiste'] +'" >' + artistes[i]['nom_artiste']
                                            + '</button> <div class="subtitle"> ' + artistes[i]['type_artiste'] + ' </div>'
                                            /* + '<button type="button" class="btn btn-primary infos btn-light mb-2" data-toggle="modal" data-target="#modalMusique" > Infos'*/
                                            + '</button> '
                                            + '</h5>'
                                        + '</li>');
        }
    }
}

