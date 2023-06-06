let autoPlay = false;
let muted = false;
let loadingMusic = false;
let currentMusique = null;
let shuffleMode = false;

let audioTag = document.querySelector('#audioTag');
let playButton = document.querySelector('.playButton');
let pauseButton = document.querySelector('.pauseButton');
let progressBar = document.querySelector("#musicProgressBar");
let timestampMusic = document.querySelector("#timestampMusic");
let sourceTag = document.querySelector('#sourceTag');
let musiqueName = document.querySelector('#musicName');
let musiqueImage = document.querySelector('#imgMusic')
let nextButton = document.querySelector('.nextButton');
let previousButton = document.querySelector('.previousButton');
const volumeSlider = document.querySelector('.volume-slider');
let likedSvg = document.querySelector('.likedButton');
let notLikedSvg = document.querySelector('.notLikedButton');
let shuffleSvg = document.querySelector('#shuffleButton');
let fileAttenteButton = document.querySelector('#attenteMusic');

const audioMuted = document.querySelector('#audioMuted');
const audioNotMuted = document.querySelectorAll('.audioNotMuted');

const setMusique = (musique, historiquePlay = false) => {
    loadingMusic = true;
    console.log("Playing", musique.id_musique, historiquePlay)

    if (!historiquePlay) {
        ajaxRequest("POST", "../php/request.php/historique", () => {}, `id=${musique.id_musique}`);
    }

    musiqueName.innerText = musique.titre_musique + " - " + musique.nom_artiste;

    ajaxRequest('GET', '../php/request.php/like/' + musique.id_musique, (isLiked) => {
        if (isLiked) {
            likedSvg.hidden = false;
            notLikedSvg.hidden = true;
        } else {
            likedSvg.hidden = true;
            notLikedSvg.hidden = false;
        }
    })

    musiqueImage.src = musique.image_album;

    sourceTag.src = musique.url_musique;
    sourceTag.type = 'audio/mpeg';
    audioTag.load();

    audioTag.appendChild(sourceTag);

    audioTag.onloadedmetadata = () => {
        loadingMusic = false;
        currentMusique = musique;
        let duration = audioTag.duration;
        audioTag.volume = volumeSlider.value / 100;
        document.querySelector("#timeOfTheMusic").textContent = parseSeconds(audioTag.duration);
        progressBar.max = duration;
        progressBar.value = 0;
        progressBar.addEventListener('change', () => {
            audioTag.currentTime = progressBar.value;
            timestampMusic.textContent = parseSeconds(audioTag.currentTime);
            if (audioTag.paused) {
                audioTag.play();
                playButton.hidden = true;
                pauseButton.hidden = false;
            }
        })
        if (autoPlay) {
            audioTag.play();
        }
    };
}

audioTag.addEventListener('ended', () => {
    autoPlay = true;
    playNext();
})

audioTag.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audioTag.currentTime);
    timestampMusic.textContent = parseSeconds(audioTag.currentTime);
})

playButton.addEventListener('click', () => {
    if (loadingMusic) return;
    audioTag.play();
    playButton.hidden = true;
    pauseButton.hidden = false;
    autoPlay = true;
})

pauseButton.addEventListener('click', () => {
    if (loadingMusic) return;
    audioTag.pause();
    playButton.hidden = false;
    pauseButton.hidden = true;
    autoPlay = false;
})

document.addEventListener("keydown", (event) => {
    if (loadingMusic) return;
    if (event.code === "Space") {
        if (audioTag.paused) {
            audioTag.play();
            playButton.hidden = true;
            pauseButton.hidden = false;
            autoPlay = true;
        } else {
            audioTag.pause();
            playButton.hidden = false;
            pauseButton.hidden = true;
            autoPlay = false;
        }
    }
    else if (event.code === "ArrowRight") {
        if (event.ctrlKey) {
            playNext();
        } else {
            audioTag.currentTime += 5;
        }
    }
    else if (event.code === "ArrowLeft") {
        if (event.ctrlKey) {
            playPrevious();
        } else {
            audioTag.currentTime -= 5;
        }
    }
    else if (event.code === "ArrowUp") {
        handleVolume((audioTag.volume * 100 + 5) / 100);
    }
    else if (event.code === "ArrowDown") {
        handleVolume((audioTag.volume * 100 - 5) / 100);
    }
    else if (event.code === "Semicolon") {
        handleMuted();
    }
})

previousButton.addEventListener('click', () => {
    playPrevious();
})

nextButton.addEventListener('click', () => {
    playNext();
})

audioMuted.addEventListener('click', () => {
    if (loadingMusic) return;
    handleVolume(volumeSlider.value / 100);
    muted = false;
});

audioNotMuted.forEach((element) => {
    element.addEventListener('click', () => {
        if (loadingMusic) return;
        audioNotMuted.forEach(e => e.hidden = true);
        audioMuted.hidden = false;
        volumeSlider.disabled = true;
        audioTag.volume = 0;
        muted = true;
    });
})

volumeSlider.addEventListener('input', () => {
    if (loadingMusic) return;
    handleVolume(volumeSlider.value / 100);
});

likedSvg.addEventListener('click', () => {
    if (loadingMusic) return;
    ajaxRequest("DELETE", "../php/request.php/like/" + currentMusique.id_musique);
    likedSvg.hidden = true;
    notLikedSvg.hidden = false;
})

notLikedSvg.addEventListener('click', () => {
    if (loadingMusic) return;
    ajaxRequest("POST", "../php/request.php/like", () => {}, `id=${currentMusique.id_musique}`);
    likedSvg.hidden = false;
    notLikedSvg.hidden = true;
})

shuffleSvg.addEventListener('click', () => {
    if (loadingMusic) return;
    shuffleMode = !shuffleMode;
    if (shuffleMode) {
        shuffleSvg.style.color = "#b3aab7";
    } else {
        shuffleSvg.style.color = "white";
    }
})

fileAttenteButton.addEventListener('click', () => {
    afficherInfoPlaylist('file_attente');
    showPlaylistInfo();
})

function setLastSong(data) {
    if (data.length > 0) {
        getMusique(data[0].id_musique, true);
    } else {
        audioTag.currentTime = 0;
    }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMusique(id_musique, historiquePlay = false) {
    ajaxRequest("GET", "../php/request.php/musique/" + id_musique, (data) => {
        setMusique(data, historiquePlay);
    });
}

function handleVolume(volume) {
    if (volume < 0.0 || volume > 1) return;
    if (muted)  {
        volume = volumeSlider.value / 100;
        volumeSlider.disabled = false;
        muted = !muted;
    }

    audioTag.volume = volume;
    if (volume <= 0) {
        audioMuted.hidden = false;
        audioNotMuted.forEach(e => e.hidden = true);
    } else if (volume < 0.35) {
        audioMuted.hidden = true;
        audioNotMuted[0].hidden = false;
        audioNotMuted[1].hidden = true;
        audioNotMuted[2].hidden = true;
    } else if (volume < 0.7) {
        audioMuted.hidden = true;
        audioNotMuted[0].hidden = true;
        audioNotMuted[1].hidden = false;
        audioNotMuted[2].hidden = true;
    } else {
        audioMuted.hidden = true;
        audioNotMuted[0].hidden = true;
        audioNotMuted[1].hidden = true;
        audioNotMuted[2].hidden = false;
    }
    volumeSlider.value = volume * 100;
}

function handleMuted() {
    if (audioTag.volume === 0) {
        audioTag.volume = volumeSlider.value / 100;
        audioMuted.hidden = true;
        audioNotMuted.forEach(e => e.hidden = true);
        if (audioTag.volume < 0.35) {
            audioNotMuted[0].hidden = false;
        } else if (audioTag.volume < 0.7) {
            audioNotMuted[1].hidden = false;
        } else {
            audioNotMuted[2].hidden = false;
        }
        volumeSlider.disabled = false;
        muted = false;
    } else {
        audioTag.volume = 0;
        audioMuted.hidden = false;
        audioNotMuted.forEach(e => e.hidden = true);
        volumeSlider.disabled = true;
        muted = true;
    }
}

function playNext() {
    if (loadingMusic) return;
    ajaxRequest("GET", "../php/request.php/file-attente" + (shuffleMode ? '/random' : ''), (data) => {
        if (data.length > 0) {
            getMusique(data[0].id_musique);
            ajaxRequest("DELETE", '../php/request.php/file-attente/' + data[0].id_musique);
        } else {
            getMusique(getRandomInteger(1, 800));
        }
    })
}

function playPrevious() {
    if (loadingMusic) return;
    ajaxRequest('DELETE', '../php/request.php/historique/last', () => {
        ajaxRequest("GET", '../php/request.php/historique', setLastSong);
    });
}

function playPlaylist(id) {
    if (loadingMusic) return;
    ajaxRequest("DELETE", '../php/request.php/file-attente', () => {
        ajaxRequest("GET", '../php/request.php/playlist/' + id, (data) => {
            ajaxRequest("GET", '../php/request.php/musique-playlist/' + data.id_playlist, (m) => {
                m.forEach(musique => {
                    ajaxRequest("POST", '../php/request.php/file-attente', () => {}, `id=${musique.id_musique}`);
                })
                playNext();
            })
        })
    })
}

function playLikedSong() {
    if (loadingMusic) return;
    ajaxRequest("DELETE", '../php/request.php/file-attente', () => {
        ajaxRequest("GET", '../php/request.php/like', (data) => {
            if (data.length > 0) {
                data.forEach((element) => {
                    ajaxRequest("POST", '../php/request.php/file-attente', () => {}, `id=${element.id_musique}`);
                })
                playNext();
            }
        })
    })
}

function playSong(id_musique) {
    if (loadingMusic) return;
    ajaxRequest("DELETE", "../php/request.php/file-attente/" + id_musique, () => {
        getMusique(id_musique);
    })
}

function addToQueueSong(id_musique) {
    if (loadingMusic) return;
    ajaxRequest("POST", "../php/request.php/file-attente", () => {}, `id=${id_musique}`);
}

function addToQueuePlaylist(id_playlist) {
    if (loadingMusic) return;
    ajaxRequest("GET", '../php/request.php/musique-playlist/' + id_playlist, (data) => {
        data.forEach(musique => {
            ajaxRequest("POST", '../php/request.php/file-attente', () => {}, `id=${musique.id_musique}`);
        })
    })
}

function addToQueueLikedSong() {
    if (loadingMusic) return;
    ajaxRequest("GET", '../php/request.php/like', (data) => {
        if (data.length > 0) {
            data.forEach((element) => {
                ajaxRequest("POST", '../php/request.php/file-attente', () => {}, `id=${element.id_musique}`);
            })
        }
    })
}

function createDropdownItem(playlist) {
    let dropdownContent = document.querySelectorAll('.dropdown-content');
    dropdownContent.forEach(e => {
        let musicId = e.dataset.musicId ?? currentMusique.id_musique;
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
            '          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>\n' +
            '        </svg>';

        let trashSvg = document.createElement('div');
        trashSvg.classList.add('trashSvg');
        trashSvg.dataset.id = playlist.id_playlist;
        trashSvg.dataset.musicId = musicId;
        trashSvg.hidden = true;
        trashSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">\n' +
            '          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>\n' +
            '        </svg>';

        dropdownItem.appendChild(text);
        dropdownItem.appendChild(addSvg);
        dropdownItem.appendChild(trashSvg);

        e.appendChild(dropdownItem);
    })
}



ajaxRequest('GET', '../php/request.php/historique', (data) => {
    if (data.length === 0) {
        getMusique(getRandomInteger(1, 300));
    } else {
        getMusique(data[0].id_musique)
    }
});

setTimeout(() => {
    // Add or delete a song from the user playlist
    ajaxRequest("GET", '../php/request.php/user-playlist', (playlists) => {
        // Add a song to a playlist
        playlists.forEach((playlist) => {
            createDropdownItem(playlist);
            if (currentMusique) {
                ajaxRequest("GET", "../php/request.php/musique-playlist/isIn", (d) => {
                    if (d.length > 0) {
                        let div = document.querySelectorAll(`.addToPlaylist`);
                        div.forEach((element) => {
                            if (parseInt(element.dataset?.id, 10) === playlist.id_playlist) {
                                element.children[1].hidden = true;
                                element.children[2].hidden = false;
                            }
                        })
                    }
                }, `id_musique=${currentMusique.id_musique}&id_playlist=${playlist.id_playlist}`);
            }


            let addSvgs = document.querySelectorAll('.addSvg');
            addSvgs.forEach((svg) => {
                if (svg.dataset.id !== 'new') {
                    svg.addEventListener('click', () => {
                        let playlist_id = svg.dataset.id;
                        let musique_id = svg.dataset.musicId;
                        svg.hidden = true;
                        svg.nextSibling.hidden = false;
                        ajaxRequest("POST", '../php/request.php/musique-playlist', (response) => {
                            console.log(response);
                        }, "id_playlist=" + playlist_id + "&id_musique=" + musique_id);
                    })
                }
            })

            let trashSvgs = document.querySelectorAll('.trashSvg');
            trashSvgs.forEach((svg) => {
                if (svg.dataset.id !== 'new') {
                    svg.addEventListener('click', () => {
                        let playlist_id = svg.dataset.id;
                        let musique_id = svg.dataset.musicId;
                        ajaxRequest("DELETE", '../php/request.php/musique-playlist?' + "id_playlist=" + playlist_id + "&id_musique=" + musique_id, (response) => {
                            console.log(response);
                            svg.hidden = true;
                            svg.previousSibling.hidden = false;
                        });
                    })
                } else {

                }
            })
        })
    })
}, 1000)

document.querySelector('.newPlaylist').addEventListener('click', () => {
    const myModalAlternative = new bootstrap.Modal(document.querySelector('#createPlaylistModal'), {focus: true});
    myModalAlternative.show();
})

document.querySelector(".addPlaylistButton").addEventListener('click', () => {
    if (currentMusique) {
        let playlistName = document.querySelector('#playlistName').value;
        let isPublic = document.querySelector('#checkboxPublic').checked;
        if (playlistName) {
            ajaxRequest('POST', '../php/request.php/playlist', (postPlaylist) => {
                ajaxRequest("POST", '../php/request.php/musique-playlist', () => {
                    ajaxRequest("GET", '../php/request.php/user/session', (data) => {
                        ajaxRequest("POST", '../php/request.php/user-playlist', () => {
                        }, `id_user=${data.id_user}&id_playlist=${postPlaylist.id_playlist}`);
                    })
                    document.querySelector('#playlistName').value = '';
                    document.querySelector('#checkboxPublic').checked = false;
                    createDropdownItem(postPlaylist);
                    refreshAccueil();
                }, `id_playlist=${postPlaylist.id_playlist}&id_musique=${currentMusique.id_musique}`);
            }, `playlistName=${playlistName}&public=${isPublic}`);
        }
    }
})
