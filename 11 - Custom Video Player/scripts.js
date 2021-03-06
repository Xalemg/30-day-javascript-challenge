// Get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build our functions

function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function skip(){
video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    video[this.name] = this.value;
}
function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis =`${percent}%`;
}
function scrub(e){
    const moveTo = (e.offsetX / progress.offsetWidth)* video.duration;
    console.log(moveTo);
    video.currentTime = moveTo;
}

//Hook up the event listeners
let mousedown = false;

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
toggle.addEventListener('click', togglePlay);
skipButton.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('click',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown=true);
progress.addEventListener('mouseup', () => mousedown=false);