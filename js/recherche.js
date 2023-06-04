'use strict';


$('#musique').click((e) =>
    {
        e.preventDefault();
        let stringrecherche = '';
        stringrecherche = document.getElementById('stringrecherche').value;
        console.log('button musique : '+stringrecherche);
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

function rechercheMusique(musiques){

    if(musiques === 'Musique introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<tr> <td  style="color: white;"> ' + musiques + ' </td> </tr>');
    }
    else {
        $('#tabrecherche').html("");
        for (let i=0 ; i < musiques.length ; i++) {
            $('#tabrecherche').append('<li class="songItem">'
                                    + '<span>'+ (i+1) +'</span>'
                                    + '<img src="../photo/agartha.jpg"/>'
                                    + '<h5>' + musiques[i]['titre_musique']
                                    + '<div class="subtitle">' + musiques[i]['nom_artiste'] + '</div>'
                                    + '<div id = "heart">'
                                    + '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">\n'
                                    + '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>\n'
                                    + '</svg>'
                                    + '</div>'
                                    + '<div id = "addPlaylistButton" >'
                                    + '<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-plus-circle" viewBox = "0 0 16 16" >'
                                    + '<path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" / >'
                                    + '<path d = "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />'
                                    + '</svg> '
                                    + '</div>'
                                    + '<div id = "infos" >'
                                    +'<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-three-dots" viewBox = "0 0 16 16" >'
                                    +'<path d = "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />'
                                    +'</svg>'
                                    + '</div>'
                                    + '</h5>'
                                    + '</li>');
        }
    }
}

function recherchePlaylist(playlists){

    if(playlists === 'Playlist introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<tr> <td  style="color: white;"> ' + playlists + ' </td> </tr>');
    }
    else {
        $('#tabrecherche').html("");
        for(let i=0; i < playlists.length; i++) {
            $('#tabrecherche').append('<li class="songItem">'
                + '<span>'+ (i+1) +'</span>'
                + '<img src="../photo/agartha.jpg"/>'
                + '<h5>' + playlists[i]['titre_playlist']
                + '<div class="subtitle"> '+ playlists[i]['nom_user'] +' </div>'
                + '<div id = "heart">'
                + '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">\n'
                + '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>\n'
                + '</svg>'
                + '</div>'
                + '<div id = "addPlaylistButton" >'
                + '<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-plus-circle" viewBox = "0 0 16 16" >'
                + '<path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" / >'
                + '<path d = "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />'
                + '</svg> '
                + '</div>'
                + '<div id = "infos" >'
                +'<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-three-dots" viewBox = "0 0 16 16" >'
                +'<path d = "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />'
                +'</svg>'
                + '</div>'
                + '</h5>'
                + '</li>');
        }
    }
}

function rechercheAlbum(albums){

    if(albums === 'Album introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<tr> <td  style="color: white;"> ' + albums + ' </td> </tr>');
    }
    else {
        $('#tabrecherche').html("");
        for (let i=0 ; i < albums.length ; i++) {
            $('#tabrecherche').append('<li class="songItem">'
                + '<span>'+ (i+1) +'</span>'
                + '<img src="../photo/agartha.jpg"/>'
                + '<h5>' + albums[i]['titre_album']
                + '<div class="subtitle"> '+ albums[i]['nom_artiste'] +' </div>'
                + '<div id = "heart">'
                + '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">\n'
                + '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>\n'
                + '</svg>'
                + '</div>'
                + '<div id = "addPlaylistButton" >'
                + '<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-plus-circle" viewBox = "0 0 16 16" >'
                + '<path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" / >'
                + '<path d = "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />'
                + '</svg> '
                + '</div>'
                + '<div id = "infos" >'
                +'<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-three-dots" viewBox = "0 0 16 16" >'
                +'<path d = "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />'
                +'</svg>'
                + '</div>'
                + '</h5>'
                + '</li>');
        }
    }
}

function rechercheArtiste(artistes){

    if(artistes === 'Artiste introuvable.') {
        $('#tabrecherche').html("");
        $('#tabrecherche').append('<tr> <td  style="color: white;"> ' + artistes + ' </td> </tr>');
    }
    else {
        $('#tabrecherche').html("");
        for (let i=0; i < artistes.length; i++) {
            $('#tabrecherche').append('<li class="songItem">'
                                        + '<span>'+ (i+1) +'</span>'
                                        + '<img src="../photo/agartha.jpg"/>'
                                        + '<h5>' + artistes[i]['nom_artiste']
                                        + '<div class="subtitle"> ' + artistes[i]['type_artiste'] + ' </div>'
                                        + '<div id = "heart">'
                                        + '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">\n'
                                        + '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>\n'
                                        + '</svg>'
                                        + '</div>'
                                        + '<div id = "addPlaylistButton" >'
                                        + '<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-plus-circle" viewBox = "0 0 16 16" >'
                                        + '<path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" / >'
                                        + '<path d = "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />'
                                        + '</svg> '
                                        + '</div>'
                                        + '<div id = "infos" >'
                                        +'<svg xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" className = "bi bi-three-dots" viewBox = "0 0 16 16" >'
                                        +'<path d = "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />'
                                        +'</svg>'
                                        + '</div>'
                                        + '</h5>'
                                        + '</li>');
        }
    }
}