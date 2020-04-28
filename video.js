let movie = document.querySelector('video');



//TOGGLE PLAY

const playBtn = document.querySelector('.toggle');
let isPlaying = false;

function playToggle() {

    isPlaying = !isPlaying;

    if (!isPlaying) {
        movie.pause()
        playBtn.innerHTML = "►";
    } else {
        movie.play()
        playBtn.innerHTML = "||";
    }
}

playBtn.addEventListener('click', playToggle);
movie.addEventListener('click', playToggle);

// BOUTON -10 ET +25

let skipBtn = document.querySelectorAll('.player__button[data-skip]');

function skip() {

    movie.currentTime = movie.currentTime + parseInt(this.dataset.skip);

}

skipBtn.forEach(bouton => bouton.addEventListener('click', skip))


//TYPE RANGE (Volume, PlayBackRate)

let ranges = document.querySelectorAll('input[type="range"]');

function typeRange(e) {

    movie[this.name] = [this.value];

}

ranges.forEach(range => range.addEventListener('input', typeRange))

// BARRE DE PROGRESSION 

let progressBar = document.querySelector('.progress');
let currentProgress = document.querySelector('.progress>.progress__filled');

function progressNow() {

    let time = (movie.currentTime * 100) / movie.duration;

    currentProgress.style.flexBasis = `${time}%`;
}

movie.addEventListener('timeupdate', progressNow);

//DEPLACER TEMPS AVEC BARRE DE PROGRESSISON

function changeMoment(e) {

    let scrubTime = (e.offsetX / progressBar.offsetWidth) * movie.duration;
    movie.currentTime = scrubTime;

}

let mouseDawn = false;
progressBar.addEventListener('click', changeMoment);
progressBar.addEventListener('mouseup', () => mouseDawn = false);
progressBar.addEventListener('mousedown', () => mouseDawn = true);
progressBar.addEventListener('mousemove', (e) => {
    if (mouseDawn) {
        changeMoment(e);
    }
})

//FULL SCREEN

let fullScreenBtn = document.querySelector('.full_screen');
let player = document.querySelector('.player');

function fullScreen() {

    movie.requestFullscreen();

}


fullScreenBtn.addEventListener('click', fullScreen)