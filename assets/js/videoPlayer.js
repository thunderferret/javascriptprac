const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
    if(videoPlayer.pause){
        videoPlayer.play();
    }else{
        videoPlayer.pause();
    }
}

function init(){
    playBtn.addEventListener("click",handlePlayClick);
}