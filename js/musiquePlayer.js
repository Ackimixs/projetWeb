let autoPlay = false;
let muted = false;
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

const audioMuted = document.querySelector('#audioMuted');
const audioNotMuted = document.querySelectorAll('.audioNotMuted');

const setMusique = (musique) => {

    ajaxRequest("POST", "../php/request.php/historique", () => {}, `id=${musique.id_musique}`);

    console.log("Playing", musique.id_musique)

    musiqueName.innerText = musique.titre_musique + " - " + musique.nom_artiste;

    musiqueImage.src = musique.image_album;

    sourceTag.src = musique.url_musique;
    sourceTag.type = 'audio/mpeg';
    audioTag.load();

    audioTag.appendChild(sourceTag);

    audioTag.onloadedmetadata = () => {
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
    console.log('ended');
    autoPlay = true;
    getMusique(getRandomInteger(1, 200))
})

audioTag.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audioTag.currentTime);
    timestampMusic.textContent = parseSeconds(audioTag.currentTime);
})

playButton.addEventListener('click', () => {
    audioTag.play();
    playButton.hidden = true;
    pauseButton.hidden = false;
    autoPlay = true;
})

pauseButton.addEventListener('click', () => {
    audioTag.pause();
    playButton.hidden = false;
    pauseButton.hidden = true;
    autoPlay = false;
})

document.addEventListener("keydown", (event) => {
    console.log(event.code);
    if (event.code === "Space") {
        if (audioTag.paused) {
            audioTag.play();
            playButton.hidden = true;
            pauseButton.hidden = false;
        } else {
            audioTag.pause();
            playButton.hidden = false;
            pauseButton.hidden = true;
        }
    }
    else if (event.code === "ArrowRight") {
        audioTag.currentTime += 5;
    }
    else if (event.code === "ArrowLeft") {
        audioTag.currentTime -= 5;
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
    ajaxRequest("GET", '../php/request.php/historique', setLastSong);
})

nextButton.addEventListener('click', () => {
    getMusique(getRandomInteger(1, 200))
})

audioMuted.addEventListener('click', () => {
    handleVolume(volumeSlider.value / 100);
    muted = false;
});

audioNotMuted.forEach((element) => {
    element.addEventListener('click', () => {
        audioNotMuted.forEach(e => e.hidden = true);
        audioMuted.hidden = false;
        volumeSlider.disabled = true;
        audioTag.volume = 0;
        muted = true;
    });
})

volumeSlider.addEventListener('change', () => {
    handleVolume(volumeSlider.value / 100);
});

function setLastSong(data) {
    if (data.length > 1) {
        getMusique(data[1].id_musique)
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

function getMusique(id_musique) {
    ajaxRequest("GET", "../php/request.php/musique/" + id_musique, setMusique);
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




getMusique(36);
