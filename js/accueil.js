'use strict';

ajaxRequest('GET', '../php/request.php/playlist/', displayPlaylist);

function displayPlaylist(playlists){

    /*console.log(playlists)
    $('#playlist').html("")
    $('#playlist').append('<table> <tr>');
    $('#playlist').append('<td id = "'+playlists['id_playlist']+'">'+playlists['titre_playlist']+'</td>');
    $('#playlist').append('</tr> </table>');*/
}

ajaxRequest('GET', '../php/request.php/user/session', user);

function user(data) {
    if (data.image_user) {
        let img = document.createElement('img');
        img.src = `../${data.image_user}`;
        document.querySelector('.profil').appendChild(img);
    } else {
        document.querySelector('#profileSkeleton').hidden = false;
    }
}