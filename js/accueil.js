'use strict';

ajaxRequest('GET', '../php/request.php/playlist/', displayPlaylist);

function displayPlaylist(playlists){

    /*console.log(playlists)
    $('#playlist').html("")
    $('#playlist').append('<table> <tr>');
    $('#playlist').append('<td id = "'+playlists['id_playlist']+'">'+playlists['titre_playlist']+'</td>');
    $('#playlist').append('</tr> </table>');*/
}

window.addEventListener('load', () => {
    ajaxRequest('GET', '../php/request.php/user/session', (data) => {
        if (!data) window.location.href = 'login.php';
    })

    ajaxRequest("GET", '../php/request.php/profile-picture', (data) => {
        let profileImg = document.querySelector('#profileImg');
        let profileSkeleton = document.querySelector('#profileSkeleton');
        if (data) {
            profileImg.src = '../' + data;
            profileImg.hidden = false;
            profileSkeleton.hidden = true;
        } else {
            profileImg.hidden = true;
            profileSkeleton.hidden = false;
        }
    })

    ajaxRequest("GET", "../php/request.php/historique", (data) => {
        let recentDiv = document.querySelector('#recentMusiqueContainer');
        data.forEach((musique) => {
            let musiqueContainer = document.createElement('div');
            musiqueContainer.classList.add('imgContainer');
            musiqueContainer.dataset.id = musique.id_musique;
            musiqueContainer.dataset.type = "musique";
            ajaxRequest("GET", '../php/request.php/album/' + musique.id_album, (album) => {
                let img = document.createElement('img');
                img.classList.add('musiqueImg');
                img.src = album.image_album;
                musiqueContainer.appendChild(img);
                let p = document.createElement('p');
                p.innerText = musique.titre_musique;
                musiqueContainer.appendChild(p);
                recentDiv.appendChild(musiqueContainer);
            })
        })
    })

    ajaxRequest("GET", '../php/request.php/like', (data) => {
        let otherPlaylist = document.querySelector('#otherMusiqueContainer');
        let likedSongContainer = document.createElement('div');
        likedSongContainer.classList.add('imgContainer');
        likedSongContainer.dataset.type = "like";
        let likedSongSvg = document.createElement("div");
        likedSongSvg.classList.add('musiqueImg')
        likedSongSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="black" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">\n' +
            '  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>\n' +
            '</svg>'
        let p = document.createElement('p');
        p.innerText = 'Musiques aimées';
        likedSongContainer.appendChild(likedSongSvg);
        likedSongContainer.appendChild(p);
        otherPlaylist.appendChild(likedSongContainer);


        // Other playlist
        ajaxRequest("GET", '../php/request.php/playlist/random', (randomPlaylists) => {
            randomPlaylists.forEach((playlist) => {
                let playlistContainer = document.createElement('div');
                playlistContainer.classList.add('imgContainer');
                playlistContainer.dataset.id = playlist.id_playlist;
                playlistContainer.dataset.type = "playlist";
                let img = document.createElement('img');
                img.classList.add('musiqueImg');
                img.src = playlist.image_playlist;
                playlistContainer.appendChild(img);
                let p = document.createElement('p');
                p.innerText = playlist.titre_playlist;
                playlistContainer.appendChild(p);
                otherPlaylist.appendChild(playlistContainer);
            })
        })
    })

    setTimeout(() => {
        let musiqueContainer = document.querySelectorAll('.imgContainer');
        musiqueContainer.forEach((container) => {
            container.addEventListener('click', () => {
                console.log("play musique => " + container.dataset.type);
                if (container.dataset.type === "musique") {
                    playNext(parseInt(container.dataset.id, 10));
                } else if (container.dataset.type === "playlist") {
                    playPlaylist(parseInt(container.dataset.id, 10));
                } else if (container.dataset.type === "like") {
                    playLikedSong();
                }
            })
        })
    }, 500)
})