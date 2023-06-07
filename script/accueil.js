'use strict';

const refreshAccueil = () => {
    // Premiere partie de l'accueil => ecouté recement
    ajaxRequest("GET", "php/request.php/historique", (data) => {
        let recentDiv = document.querySelector('#recentMusiqueContainer');
        recentDiv.innerHTML = '';

        if (data.length === 0) {
            document.querySelector("#recentMusique").hidden = true;
            return;
        }

        data.forEach((musique) => {
            let musiqueContainer = document.createElement('div');
            musiqueContainer.classList.add('imgContainer');
            musiqueContainer.dataset.id = musique.id_musique;
            musiqueContainer.dataset.type = "musique";
            ajaxRequest("GET", 'php/request.php/album/' + musique.id_album, (album) => {
                album = album[0];
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
    ajaxRequest("GET", 'php/request.php/like', (data) => {
        let otherPlaylist = document.querySelector('#otherMusiqueContainer');
        otherPlaylist.innerHTML = '';
        let likedSongContainer = document.createElement('div');
        likedSongContainer.classList.add('imgContainer');
        likedSongContainer.dataset.type = "like";
        let likedSongSvg = document.createElement("div");
        likedSongSvg.classList.add('musiqueImg');
        likedSongSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="white" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">\n' +
                                '  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>\n' +
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


        ajaxRequest("GET", "php/request.php/private-playlist", (d) => {
            d.forEach((privatePlaylist) => {
                let playlistContainer = document.createElement('div');
                playlistContainer.classList.add('imgContainer');
                playlistContainer.dataset.id = privatePlaylist.id_playlist;
                playlistContainer.dataset.type = "playlist";
                if (privatePlaylist.image_playlist) {
                    let img = document.createElement('img');
                    img.classList.add('musiqueImg');
                    img.src = privatePlaylist.image_playlist;
                    playlistContainer.appendChild(img);
                } else {
                    let imgContainer = document.createElement('div')
                    imgContainer.classList.add('musiqueImg');
                    imgContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="white" class="bi bi-music-note" viewBox="0 0 16 16">\n' +
                        '  <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>\n' +
                        '  <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>\n' +
                        '  <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>\n' +
                        '</svg>'

                    playlistContainer.appendChild(imgContainer);
                }
                let textContainer = document.createElement('div');
                textContainer.classList.add('musiqueTextInfo');
                let p = document.createElement('p');
                let three_dots = createThreeDotsDropDown('playlist', privatePlaylist.id_playlist);

                p.innerText = privatePlaylist.titre_playlist;
                textContainer.appendChild(p);
                textContainer.appendChild(three_dots);
                playlistContainer.appendChild(textContainer);
                otherPlaylist.appendChild(playlistContainer);

            })


            // Other playlist
            ajaxRequest("GET", 'php/request.php/playlist/random', (randomPlaylists) => {
                randomPlaylists.forEach((playlist) => {
                    let playlistContainer = document.createElement('div');
                    playlistContainer.classList.add('imgContainer');
                    playlistContainer.dataset.id = playlist.id_playlist;
                    playlistContainer.dataset.type = "playlist";
                    if (playlist.image_playlist) {
                    let img = document.createElement('img');
                        img.classList.add('musiqueImg');
                        img.src = playlist.image_playlist;
                        playlistContainer.appendChild(img);
                    } else {
                        let imgContainer = document.createElement('div')
                        imgContainer.classList.add('musiqueImg');
                        imgContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="white" class="bi bi-music-note" viewBox="0 0 16 16">\n' +
                            '  <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>\n' +
                            '  <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>\n' +
                            '  <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>\n' +
                            '</svg>'

                        playlistContainer.appendChild(imgContainer);
                    }
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
    })


    // Add event listener to dropdown
    setTimeout(() => {
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


    // Add event on click on musique
    setTimeout(() => {
        let musiqueContainer = document.querySelectorAll('.imgContainer');
        musiqueContainer.forEach((container) => {
            container.addEventListener('click', () => {
                if (container.dataset.type === "musique") {
                    playSong(parseInt(container.dataset.id, 10));
                } else if (container.dataset.type === "playlist") {
                    afficherInfoPlaylist("playlist", parseInt(container.dataset.id, 10));
                    showPlaylistInfo();
                } else if (container.dataset.type === "like") {
                    afficherInfoPlaylist("like");
                    showPlaylistInfo();
                }
            })
        })
    }, 1000)
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

refreshAccueil();