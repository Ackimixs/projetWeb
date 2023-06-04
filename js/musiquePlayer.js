let autoPlay = false;
let muted = false;
let loadingMusic = false;
let currentMusique = null;

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
        event.preventDefault();
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

volumeSlider.addEventListener('change', () => {
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
    ajaxRequest("POST", "../php/request.php/like", (d) => {}, `id=${currentMusique.id_musique}`);
    likedSvg.hidden = false;
    notLikedSvg.hidden = true;
})

function setLastSong(data) {
    if (data.length > 0) {
        getMusique(data[0].id_musique, true);
    } else {
        audioTag.currentTime = 0;
    }
}

function parseSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const minutesFormatted = String(minutes).padStart(2, '0');
    const secondsFormatted = String(remainingSeconds).padStart(2, '0');

    return `${minutesFormatted}:${secondsFormatted}`;
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
    ajaxRequest("GET", "../php/request.php/file-attente", (data) => {
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
            if (data.length > 0) {
                data.forEach((element) => {
                    ajaxRequest("POST", '../php/request.php/file-attente', (d) => {}, `id=${element.id_musique}`);
                })
                playNext();
            }
        })
    })
}

function playLikedSong() {
    if (loadingMusic) return;
    ajaxRequest("DELETE", '../php/request.php/file-attente', () => {
        ajaxRequest("GET", '../php/request.php/like', (data) => {
            if (data.length > 0) {
                data.forEach((element) => {
                    ajaxRequest("POST", '../php/request.php/file-attente', (d) => {}, `id=${element.id_musique}`);
                })
                playNext();
            }
        })
    })
}

ajaxRequest('GET', '../php/request.php/historique', (data) => {
    if (data.length === 0) {
        getMusique(getRandomInteger(1, 800));
    } else {
        getMusique(data[0].id_musique)
    }
});