window.addEventListener('load', () => {
    let audioTag = document.querySelector('#audioTag');
    let playButton = document.querySelector('.playButton');
    let pauseButton = document.querySelector('.pauseButton');
    pauseButton.hidden = true;

    let sourceTag = document.createElement('source');
    sourceTag.src = 'https://r2.ackimixs.xyz/music/Captain KronoMuzik.mp3';
    sourceTag.type = 'audio/mpeg';
    audioTag.load();

    audioTag.appendChild(sourceTag);

    audioTag.onloadedmetadata = () => {
        let duration = audioTag.duration;
        let progressBar = document.querySelector("#musicProgressBar");
        let timestampMusic = document.querySelector("#timestampMusic");
        let timeOfTheMusic = document.querySelector("#timeOfTheMusic");
        progressBar.max = duration;
        progressBar.value = 0;
        progressBar.addEventListener('change', () => {
            audioTag.currentTime = progressBar.value;
            timestampMusic.textContent = parseSeconds(audioTag.currentTime);
            timeOfTheMusic.textContent = parseSeconds(audioTag.duration);
        })

        audioTag.addEventListener('timeupdate', () => {
            progressBar.value = audioTag.currentTime;
            timestampMusic.textContent = parseSeconds(audioTag.currentTime);
            timeOfTheMusic.textContent = parseSeconds(audioTag.duration);
        })
    };


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
})


function parseSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const minutesFormatted = String(minutes).padStart(2, '0');
    const secondsFormatted = String(remainingSeconds).padStart(2, '0');

    return `${minutesFormatted}:${secondsFormatted}`;
}