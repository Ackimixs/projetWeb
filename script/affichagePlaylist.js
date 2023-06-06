function createAffichagePLaylist(info, isUserPlaylist = false) {
    // Create the outermost div element with class "Morceau"
    const morceauDiv = document.createElement('div');
    morceauDiv.classList.add('Morceau');
    morceauDiv.dataset.id = info.id_musique;

    // Create the div element with class "name"
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');

    nameDiv.addEventListener('click', () => {
        playSong(info.id_musique);
    })

    // Create the image element with the specified attributes
    let image;
    if (info.image_album) {
        image = document.createElement('img');
        image.classList.add('musiqueInfoImage')
        image.src = info.image_album;
        image.width = 70;
        image.height = 70;
    } else {
        image = document.createElement("div");
        image.classList.add('musiqueInfoImage');
        image.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="white" class="bi bi-music-note" viewBox="0 0 16 16">\n' +
            '  <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>\n' +
            '  <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>\n' +
            '  <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>\n' +
            '</svg>'
        image.width = 70;
        image.height = 70;
    }

    // Create the div element with class "test"
    const testDiv = document.createElement('div');
    testDiv.classList.add('test');

    // Create the div element with class "title"
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');

    // Create the p element for the title
    const titleP = document.createElement('p');
    titleP.textContent = info.titre_musique.length > 12 ? info.titre_musique.slice(0, 10) + '...' : info.titre_musique;

    // Create the div element with class "artiste"
    const artisteDiv = document.createElement('div');
    artisteDiv.classList.add('artiste');

    // Create the p element for the artiste
    const artisteP = document.createElement('p');
    artisteP.textContent = info.nom_artiste;

    // Append the p elements to the corresponding div elements
    titleDiv.appendChild(titleP);
    artisteDiv.appendChild(artisteP);

    // Append the div elements to the "test" div
    testDiv.appendChild(titleDiv);
    testDiv.appendChild(artisteDiv);

    // Append the image and "test" div to the "name" div
    nameDiv.appendChild(image);
    nameDiv.appendChild(testDiv);

    // Create the div element with class "albumContainer"
    const albumContainerDiv = document.createElement('div');
    albumContainerDiv.classList.add('albumContainer');

    // Create the p element for the album name
    const albumNameP = document.createElement('p');
    albumNameP.classList.add('albumName');
    albumNameP.textContent = info.titre_album.length > 10 ? info.titre_album.slice(0, 8) + '...' : info.titre_album;

    // Append the album name p element to the "albumContainer" div
    albumContainerDiv.appendChild(albumNameP);

    // Create the div element with class "infos"
    const infosDiv = document.createElement('div');
    infosDiv.classList.add('infos');

    // Create the heart svg element
    const hearthDiv = document.createElement('div');
    const heartSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heartSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    heartSvg.setAttribute('width', '40');
    heartSvg.setAttribute('height', '40');
    heartSvg.setAttribute('fill', 'currentColor');
    heartSvg.classList.add('bi', 'bi-heart');
    heartSvg.setAttribute('viewBox', '0 0 16 16');

    // Create the path element for the heart svg
    const heartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    heartPath.setAttribute('d', 'm8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z');

    // Append the path element to the heart svg
    heartSvg.appendChild(heartPath);
    hearthDiv.appendChild(heartSvg)

    // Create the heart liked
    const heartLikedDiv = document.createElement('div');
    const heartLikedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heartLikedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    heartLikedSvg.setAttribute('width', '40');
    heartLikedSvg.setAttribute('height', '40');
    heartLikedSvg.setAttribute('fill', 'currentColor');
    heartLikedSvg.classList.add('bi', 'bi-heart');
    heartLikedSvg.setAttribute('viewBox', '0 0 16 16');

    // Create the path element for the heart svg
    const heartLikedPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    heartLikedPath.setAttribute('d', 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z');

    // Append the path element to the heart svg
    heartLikedSvg.appendChild(heartLikedPath);
    heartLikedDiv.appendChild(heartLikedSvg);

    heartLikedDiv.hidden = false;
    ajaxRequest("GET", '../php/request.php/like/' + info.id_musique, (data) => {
        if (data) {
            hearthDiv.hidden = true;
            heartLikedDiv.hidden = false;
        } else {
            hearthDiv.hidden = false;
            heartLikedDiv.hidden = true;
        }
    })
    hearthDiv.addEventListener('click', () => {
        ajaxRequest("POST", '../php/request.php/like', (d) => {
        }, `id=${info.id_musique}`);
        hearthDiv.hidden = true;
        heartLikedDiv.hidden = false;
    })
    heartLikedDiv.addEventListener('click', () => {
        ajaxRequest("DELETE", '../php/request.php/like/' + info.id_musique, (d) => {
        })
        hearthDiv.hidden = false;
        heartLikedDiv.hidden = true;
    })


    // Create the plus-circle svg element
    const plusCircleDiv = document.createElement('div');
    const plusCircleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    plusCircleSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    plusCircleSvg.setAttribute('width', '40');
    plusCircleSvg.setAttribute('height', '40');
    plusCircleSvg.setAttribute('fill', 'currentColor');
    plusCircleDiv.classList.add('addPlaylistButton', 'dropdown');
    plusCircleSvg.classList.add('bi', 'bi-plus-circle', 'dropdown-icon');
    plusCircleSvg.setAttribute('viewBox', '0 0 16 16');

    let dropdownContent = document.createElement("div");
    dropdownContent.classList.add('dropdown-content');
    dropdownContent.dataset.musicId = info.id_musique;

    // Create the path element for the plus-circle svg
    let plusCirclePath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    plusCirclePath1.setAttribute('d', 'M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z');

    plusCircleSvg.appendChild(plusCirclePath1);

    setTimeout(() => {
        plusCircleDiv.appendChild(dropdownContent);
    }, 10)

    let plusCirclePath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    plusCirclePath2.setAttribute('d', 'M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z');
    plusCircleSvg.appendChild(plusCirclePath2);

    plusCircleDiv.appendChild(plusCircleSvg);

    // Create the p element for the duration
    const durationP = document.createElement('p');
    durationP.textContent = parseSeconds(info.temps_musique / 1000);

    // Append the heart, plus-circle svgs, and duration p to the "infos" div
    infosDiv.appendChild(hearthDiv);
    infosDiv.appendChild(heartLikedDiv);
    infosDiv.appendChild(plusCircleDiv);
    infosDiv.appendChild(durationP);

    // Create the div element with class "delete"
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('delete');

    if (isUserPlaylist) {
        // Create the trash3 svg element
        const trash3Svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        trash3Svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        trash3Svg.setAttribute('width', '40');
        trash3Svg.setAttribute('height', '40');
        trash3Svg.setAttribute('fill', 'currentColor');
        trash3Svg.classList.add('bi', 'bi-trash3', 'deleteFromPlaylist');
        trash3Svg.dataset.id = info.id_musique;
        trash3Svg.setAttribute('viewBox', '0 0 16 16');

        // Create the path element for the trash3 svg
        const trash3Path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        trash3Path.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');
        trash3Svg.appendChild(trash3Path);

        // Append the trash3 and three-dots svgs to the "delete" div
        deleteDiv.appendChild(trash3Svg);
    }

    // Append all the elements to the outermost div "morceauDiv"
    morceauDiv.appendChild(nameDiv);
    morceauDiv.appendChild(albumContainerDiv);
    morceauDiv.appendChild(infosDiv);
    morceauDiv.appendChild(deleteDiv);

    let container = document.querySelector('#listeMorceaux')
    container.appendChild(morceauDiv);

    ajaxRequest("GET", '../php/request.php/user-playlist', (playlists) => {
        playlists.forEach(e => createDropdownItemInfo(e, dropdownContent));
    })
}

function afficherInfoPlaylist(type = "playlist", id = 1) {
    if (type === "playlist") {
        ajaxRequest('GET', '../php/request.php/playlist/' + id.toString(), (d) => {

            document.querySelector("#playlistInfoName").innerHTML = d.titre_playlist;
            if (d.image_playlist) {
                let img = document.createElement("img");
                img.src = d.image_playlist;
                img.id = "playlistInfoImage";

                document.querySelector("#one").innerHTML = "";
                document.querySelector("#one").appendChild(img);
            } else {
                let likedSongContainer = document.createElement('div');
                likedSongContainer.classList.add('playlistInfoImage');
                let likedSongSvg = document.createElement("div");
                likedSongSvg.classList.add('musiqueImg');
                likedSongSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="white" class="bi bi-music-note" viewBox="0 0 16 16">\n' +
                        '  <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>\n' +
                        '  <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>\n' +
                        '  <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>\n' +
                        '</svg>'
                likedSongContainer.appendChild(likedSongSvg);
                document.querySelector("#one").innerHTML = "";
                document.querySelector("#one").appendChild(likedSongContainer);
            }

            document.querySelector('.ecouter').dataset.id = d.id_playlist;

            ajaxRequest("GET", '../php/request.php/musique-playlist/' + id.toString(), (data) => {
                ajaxRequest("GET", '../php/request.php/user-playlist/' + d.id_playlist, (user) => {
                    data.forEach(e => createAffichagePLaylist(e, user.length > 0));

                    if (user.length === 0) {
                        document.querySelector('.supprContainer').hidden = true;
                    } else {
                        document.querySelector('.supprContainer').hidden = false;
                        document.querySelector('.suppr').addEventListener('click', () => {
                            ajaxRequest("DELETE", `../php/request.php/playlist/${d.id_playlist}`, (data) => {
                                document.querySelector('#listeMorceaux').remove();
                                document.querySelector('#affichagePlaylist').hidden = true;
                                document.querySelector('#accueil').hidden = false;
                                refreshAccueil();
                            })
                        })
                    }
                })
            })

            setTimeout(() => {
                let trash3Svgs = document.querySelectorAll(".deleteFromPlaylist");
                trash3Svgs.forEach(svg => {
                    svg.addEventListener('click', () => {
                        ajaxRequest("DELETE", `../php/request.php/musique-playlist?id_musique=${svg.dataset.id}&id_playlist=${d.id_playlist}`, (data) => {
                            document.querySelectorAll('.Morceau').forEach(e => {
                                if (e.dataset.id === svg.dataset.id) {
                                    e.remove();
                                }
                            })
                        })
                    })
                })
            }, 500)
        })

        let button = document.querySelector('.ecouter');
        button.addEventListener('click', () => {
            playPlaylist(button.dataset.id);
        })

    } else if (type === "like") {
        document.querySelector("#playlistInfoName").innerHTML = "Musiques aimées";
        let likedSongContainer = document.createElement('div');
        likedSongContainer.classList.add('playlistInfoImage');
        let likedSongSvg = document.createElement("div");
        likedSongSvg.classList.add('musiqueImg');
        likedSongSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="white" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">\n' +
                                '  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>\n' +
                                '</svg>'
        likedSongContainer.appendChild(likedSongSvg);
        document.querySelector("#one").innerHTML = "";
        document.querySelector("#one").appendChild(likedSongContainer);

        ajaxRequest("GET", '../php/request.php/like', (data) => {
            data.forEach(e => {
                createAffichagePLaylist(e, true)
                document.querySelector('.supprContainer').innerHTML = "";
            });
        })

        document.querySelector(".ecouter").addEventListener('click', () => {
            playLikedSong();
        })

        setTimeout(() => {
            let trash3Svgs = document.querySelectorAll(".deleteFromPlaylist");
            trash3Svgs.forEach(svg => {
                svg.addEventListener('click', () => {
                    ajaxRequest("DELETE", `../php/request.php/like/${svg.dataset.id}`, (data) => {
                        document.querySelectorAll('.Morceau').forEach(e => {
                            if (e.dataset.id === svg.dataset.id) {
                                e.remove();
                            }
                        })
                    })
                })
            })
        }, 500)
    } else if (type === "file_attente") {
        document.querySelector("#playlistInfoName").innerHTML = "File d'attente";
        let likedSongContainer = document.createElement('div');
        likedSongContainer.classList.add('playlistInfoImage');
        let likedSongSvg = document.createElement("div");
        likedSongSvg.classList.add('musiqueImg');
        likedSongSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="white" class="bi bi-clock-history" viewBox="0 0 16 16">\n' +
                                '  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>\n' +
                                '  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>\n' +
                                '  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>\n' +
                                '</svg>'
        likedSongContainer.appendChild(likedSongSvg);
        document.querySelector("#one").innerHTML = "";
        document.querySelector("#one").appendChild(likedSongContainer);
        document.querySelector(".ecouter").hidden = true;

        ajaxRequest("GET", '../php/request.php/file-attente', (data) => {
            data.forEach(e => {
                createAffichagePLaylist(e, true)
                document.querySelector('.supprContainer').innerHTML = "";
            });
        })

        setTimeout(() => {
            let trash3Svgs = document.querySelectorAll(".deleteFromPlaylist");
            trash3Svgs.forEach(svg => {
                svg.addEventListener('click', () => {
                    ajaxRequest("DELETE", `../php/request.php/file-attente/${svg.dataset.id}`, (data) => {
                        document.querySelectorAll('.Morceau').forEach(e => {
                            if (e.dataset.id === svg.dataset.id) {
                                e.remove();
                            }
                        })
                    })
                })
            })
        }, 500)
    }
}

function showPlaylistInfo() {
    document.querySelector('#tabrecherche').hidden = true;
    document.querySelector('#accueil').hidden = true;
    document.querySelector('#profile').hidden = true;
    document.querySelector('#display2').hidden = true;
    document.querySelector('#affichagePlaylist').hidden = false;
    document.querySelector('#listeMorceaux').innerHTML = "";
}



function createDropdownItemInfo(playlist, parent) {
    let musicId = parent.dataset.musicId ?? currentMusique.id_musique;
    let dropdownItem = document.createElement('div');
    dropdownItem.classList.add('addToPlaylist');
    dropdownItem.dataset.id = playlist.id_playlist;
    dropdownItem.dataset.id = musicId;

    let text = document.createElement('p');
    text.innerText = playlist.titre_playlist;

    let addSvg = document.createElement('div');
    addSvg.classList.add('addSvg');
    addSvg.dataset.id = playlist.id_playlist;
    addSvg.dataset.musicId = musicId;
    addSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">\n' +
                       '    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>\n' +
                       '</svg>';

    addSvg.addEventListener('click', () => {
        let playlist_id = addSvg.dataset.id;
        let musique_id = addSvg.dataset.musicId;
        addSvg.hidden = true;
        addSvg.nextSibling.hidden = false;
        ajaxRequest("POST", '../php/request.php/musique-playlist', (response) => {
            console.log(response);
        }, "id_playlist=" + playlist_id + "&id_musique=" + musique_id);
    })

    let trashSvg = document.createElement('div');
    trashSvg.classList.add('trashSvg');
    trashSvg.dataset.id = playlist.id_playlist;
    trashSvg.dataset.musicId = musicId;
    trashSvg.hidden = true;
    trashSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">\n' +
        '          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>\n' +
        '        </svg>';

    trashSvg.addEventListener('click', () => {
        let playlist_id = trashSvg.dataset.id;
        let musique_id = trashSvg.dataset.musicId;
        trashSvg.hidden = true;
        trashSvg.previousSibling.hidden = false;
        ajaxRequest("DELETE", '../php/request.php/musique-playlist?' + "id_playlist=" + playlist_id + "&id_musique=" + musique_id, (response) => {
            console.log(response);
        });
    })

    dropdownItem.appendChild(text);
    dropdownItem.appendChild(addSvg);
    dropdownItem.appendChild(trashSvg);

    parent.appendChild(dropdownItem);

    ajaxRequest("GET", "../php/request.php/musique-playlist/isIn", (d) => {
        if (d.length > 0) {
            dropdownItem.children[1].hidden = true;
            dropdownItem.children[2].hidden = false;
        }
    }, `id_musique=${musicId}&id_playlist=${playlist.id_playlist}`);
}