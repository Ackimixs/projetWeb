const setMusique = (musique) => {
    let audioTag = document.querySelector('#audioTag');
    let playButton = document.querySelector('.playButton');
    let pauseButton = document.querySelector('.pauseButton');
    pauseButton.hidden = true;

    let musiqueName = document.querySelector('#musicName');
    musiqueName.innerText = musique.titre_musique + " - " + musique.nom_artiste;

    let musiqueImage = document.querySelector('#imgMusic')
    musiqueImage.src = musique.image_album;

    let sourceTag = document.querySelector('#sourceTag');
    sourceTag.src = musique.url_musique;
    sourceTag.type = 'audio/mpeg';
    audioTag.load();

    audioTag.appendChild(sourceTag);

    audioTag.onloadedmetadata = () => {
        let duration = audioTag.duration;
        document.querySelector("#timeOfTheMusic").textContent = parseSeconds(audioTag.duration);
        let progressBar = document.querySelector("#musicProgressBar");
        let timestampMusic = document.querySelector("#timestampMusic");
        progressBar.max = duration;
        progressBar.value = 0;
        progressBar.addEventListener('change', () => {
            audioTag.currentTime = progressBar.value;
            timestampMusic.textContent = parseSeconds(audioTag.currentTime);
        })

        audioTag.addEventListener('timeupdate', () => {
            progressBar.value = audioTag.currentTime;
            timestampMusic.textContent = parseSeconds(audioTag.currentTime);
        })
    };

    audioTag.addEventListener('ended', () => {
        console.log('ended');
    })

    playButton.addEventListener('click', () => {
        audioTag.play();
        playButton.hidden = true;
        pauseButton.hidden = false;
    })

    pauseButton.addEventListener('click', () => {
        audioTag.pause();
        playButton.hidden = false;
        pauseButton.hidden = true;
    })
}


function parseSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const minutesFormatted = String(minutes).padStart(2, '0');
    const secondsFormatted = String(remainingSeconds).padStart(2, '0');

    return `${minutesFormatted}:${secondsFormatted}`;
}

function getMusique(id_musique) {
    ajaxRequest("GET", "../php/request.php/musique/" + id_musique, setMusique);
}

getMusique(205);