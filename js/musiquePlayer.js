let autoPlay = false;
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
const audioNotMuted = document.querySelector('#audioNotMuted');

const setMusique = (musique) => {

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

previousButton.addEventListener('click', () => {
    getMusique(getRandomInteger(1, 200))
})

nextButton.addEventListener('click', () => {
    getMusique(getRandomInteger(1, 200))
})

audioMuted.addEventListener('click', () => {
    audioMuted.hidden = true;
    audioNotMuted.hidden = false;
    volumeSlider.disabled = false;
    audioTag.volume = volumeSlider.value / 100;
});

audioNotMuted.addEventListener('click', () => {
    audioMuted.hidden = false;
    audioNotMuted.hidden = true;
    volumeSlider.disabled = true;
    audioTag.volume = 0;
})

volumeSlider.addEventListener('change', () => {
  audioTag.volume = volumeSlider.value / 100;
});

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

getMusique(36);