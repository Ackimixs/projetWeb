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


    // Premiere partie de l'accueil => ecouté recement
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
                let textContainer = document.createElement('div');
                textContainer.classList.add('musiqueTextInfo');
                let p = document.createElement('p');
                let three_dots = createThreeDotsDropDown('musique', musique.id_musique);
                p.innerText = musique.titre_musique;
                textContainer.appendChild(p);
                textContainer.appendChild(three_dots);
                musiqueContainer.appendChild(textContainer);
                recentDiv.appendChild(musiqueContainer);
            })
        })
    })

    // Add the liked playlist to the other part of the 'accueil'
    ajaxRequest("GET", '../php/request.php/like', (data) => {
        let otherPlaylist = document.querySelector('#otherMusiqueContainer');
        let likedSongContainer = document.createElement('div');
        likedSongContainer.classList.add('imgContainer');
        likedSongContainer.dataset.type = "like";
        let likedSongSvg = document.createElement("div");
        likedSongSvg.classList.add('musiqueImg');
        likedSongSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="black" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">\n' +
            '  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>\n' +
            '</svg>'
        let textContainer = document.createElement('div');
        textContainer.classList.add('musiqueTextInfo');
        let p = document.createElement('p');
        let three_dots = createThreeDotsDropDown("like", 'imgContainer');
        p.innerText = "Musiques aimées";
        textContainer.appendChild(p);
        textContainer.appendChild(three_dots);
        likedSongContainer.appendChild(likedSongSvg);
        likedSongContainer.appendChild(textContainer);
        otherPlaylist.appendChild(likedSongContainer);


        // TODO add the user playlist first here and after the other playlist

        // Other playlist
        ajaxRequest("GET", '../php/request.php/playlist/random', (randomPlaylists) => {
            randomPlaylists.forEach((playlist) => {
                let playlistContainer = document.createElement('div');
                playlistContainer.classList.add('imgContainer');
                playlistContainer.dataset.id = playlist.id_playlist;
                playlistContainer.dataset.type = "playlist";
                let img = document.createElement('img');
                img.classList.add('musiqueImg');
                if (playlist.image_playlist) {
                    img.src = playlist.image_playlist;
                } else {
                    img.src = '../photo/fouche.jpg'
                }
                playlistContainer.appendChild(img);
                let textContainer = document.createElement('div');
                textContainer.classList.add('musiqueTextInfo');
                let p = document.createElement('p');
                let three_dots = createThreeDotsDropDown('playlist', playlist.id_playlist);

                p.innerText = playlist.titre_playlist;
                textContainer.appendChild(p);
                textContainer.appendChild(three_dots);
                playlistContainer.appendChild(textContainer);
                otherPlaylist.appendChild(playlistContainer);
            })
        })
    })

    // Add event for every image
    setTimeout(() => {
        let musiqueContainer = document.querySelectorAll('.imgContainer');
        musiqueContainer.forEach((container) => {
            container.addEventListener('click', () => {
                if (container.dataset.type === "musique") {
                    playSong(parseInt(container.dataset.id, 10));
                } else if (container.dataset.type === "playlist") {
                    playPlaylist(parseInt(container.dataset.id, 10));
                } else if (container.dataset.type === "like") {
                    playLikedSong();
                }
            })
        })


        // add to queue and play next three dot
        let dropdownItem = document.querySelectorAll('.dropdownMusique-item');
        dropdownItem.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
                if (item.classList.contains("playNow")) {
                    console.log("play now");
                    if (currentMusique) {
                        if (item.dataset.type === "musique") {
                            playSong(parseInt(item.dataset.id, 10));
                        } else if (item.dataset.type === "playlist") {
                            playPlaylist(parseInt(item.dataset.id, 10));
                        } else if (item.dataset.type === "like") {
                            playLikedSong();
                        }
                    }
                } else if (item.classList.contains("addToQueue")) {
                    console.log("add to queue");
                    if (currentMusique) {
                        if (item.dataset.type === "musique") {
                            addToQueueSong(parseInt(item.dataset.id, 10));
                        } else if (item.dataset.type === "playlist") {
                            addToQueuePlaylist(parseInt(container.dataset.id, 10));
                        } else if (item.dataset.type === "like") {
                            addToQueueLikedSong();
                        }
                    }
                }
                item.closest(".dropdownMusique").classList.remove('open');
            })
        })
    }, 500)


    // add to playlist dropdown
    setTimeout(() => {
        let dropdown = document.querySelector('.dropdown');
        let dropdownIcon = document.querySelector('.dropdown-icon');

        dropdownIcon.addEventListener('click', () => {
            dropdown.classList.toggle('open');

            // Smooth scroll to top of the dropdown content
            let dropdownContent = document.querySelector('.dropdown-content');
            if (dropdown.classList.contains('open')) {
                dropdownContent.scrollTop = 0;
            }
        });

        // three dot dropdown
        let dropdownMusique = document.querySelectorAll('.dropdownMusique');
        dropdownMusique.forEach((element) => {
            let dropdownMusiqueIcon = element.firstChild;
            dropdownMusiqueIcon.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
                console.log('dropdown icon musique');
                element.classList.toggle('open');

                // Smooth scroll to top of the dropdown content
                let dropdownMusiqueContent = document.querySelector('.dropdownMusique-content');
                if (element.classList.contains('open')) {
                    dropdownMusiqueContent.scrollTop = 0;
                }
            });

        })
    }, 500)




    // Add or delete a song from the user playlist
    ajaxRequest("GET", '../php/request.php/user-playlist', (playlists) => {
        playlists.forEach((playlist) => {
            createDropdownItem(playlist);

            let addSvgs = document.querySelectorAll('.addSvg');
            let trashSvgs = document.querySelectorAll('.trashSvg');
            addSvgs.forEach((svg) => {
                svg.addEventListener('click', () => {
                    console.log("add");
                    if (currentMusique) {
                        let playlist_id = svg.dataset.id;
                        let musique_id = currentMusique.id_musique;
                        ajaxRequest("POST", '../php/request.php/user-playlist', (response) => {
                            console.log(response);
                        }, "id_playlist=" + playlist_id + "&id_musique=" + musique_id);
                    }
                })
            })

            trashSvgs.forEach((svg) => {
                svg.addEventListener('click', () => {
                    console.log("delete");
                    if (currentMusique) {
                        let playlist_id = svg.dataset.id;
                        let musique_id = currentMusique.id_musique;
                        ajaxRequest("DELETE", '../php/request.php/user-playlist', (response) => {
                            console.log(response);
                        }, "id_playlist=" + playlist_id + "&id_musique=" + musique_id);
                    }
                })
            })
        })
    })


})

function createDropdownItem(playlist) {
let dropdownContent = document.querySelector('.dropdown-content');
    let dropdownItem = document.createElement('div');
    dropdownItem.classList.add('addToPlaylist');
    dropdownItem.dataset.id = playlist.id_playlist;

    let text = document.createElement('p');
    text.innerText = playlist.titre_playlist;

    let addSvg = document.createElement('div');
    addSvg.classList.add('addSvg');
    addSvg.dataset.id = playlist.id_playlist;
    addSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">\n' +
        '          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>\n' +
        '        </svg>';

    let trashSvg = document.createElement('div');
    trashSvg.classList.add('trashSvg');
    trashSvg.dataset.id = playlist.id_playlist;
    trashSvg.hidden = true;
    trashSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">\n' +
        '          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>\n' +
        '        </svg>';

    dropdownItem.appendChild(text);
    dropdownItem.appendChild(addSvg);
    dropdownItem.appendChild(trashSvg);

    dropdownContent.appendChild(dropdownItem);
}

function createThreeDotsDropDown(dataType, dataId) {
    let three_dots = document.createElement('div');
    three_dots.className = 'three-dots';

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-three-dots");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.classList.add('dropdownMusique-icon');

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z");

    svg.appendChild(path);
    three_dots.appendChild(svg);

    let dropdownMusiqueContent = document.createElement('div');
    dropdownMusiqueContent.classList.add('dropdownMusique-content');
    let playNow = document.createElement('p');
    playNow.classList.add('dropdownMusique-item');
    playNow.classList.add('playNow');
    playNow.dataset.type = dataType;
    playNow.dataset.id = dataId;
    playNow.innerText = "Play now";
    let addToQueue = document.createElement('p');
    addToQueue.classList.add('dropdownMusique-item');
    addToQueue.classList.add('addToQueue');
    addToQueue.dataset.type = dataType;
    addToQueue.dataset.id = dataId;
    addToQueue.innerText = "Add to queue";
    dropdownMusiqueContent.appendChild(playNow);
    dropdownMusiqueContent.appendChild(addToQueue);
    three_dots.appendChild(dropdownMusiqueContent);

    three_dots.classList.add('thee_dots');
    three_dots.classList.add('dropdownMusique');
    return three_dots;
}

// TODO handle le bouton file d'attente lorsque l'affichage de playlist seras fait