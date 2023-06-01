

'use strict';

ajaxRequest('GET', '../php/request.php/playlist/', displayPlaylist);

function displayPlaylist(playlists){

    console.log(playlists)
    $('#playlist').html("")
    $('#playlist').append('<div><p>'+playlists['titre_playlist']+'</p></div>')

}