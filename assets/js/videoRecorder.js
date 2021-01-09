const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");
let streamObject;
let videoRecorder;

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
     console.log(videoRecorder);
     videoRecorder.addEventListener("dataavailable",handleVideoData);
     recordBtn.addEventListener("click",stopRecording);
};

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click",stopRecording);
    recordBtn.addEventListener("click",getVideo);
    recordBtn.innerHTML = "Start ReCording";
}

const handleVideoData = (event) => {
    const {data : videoFile} = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();

};


const getVideo = async () =>{    
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio : true
        });
        streamObject = stream;
        videoPreview.srcObject = streamObject;
        videoPreview.play();
        recordBtn.innerHTML = "Stop Recording";
        startRecording();
    }catch(error){
        console.log(error);
    }finally{
        recordBtn.removeEventListener("click",startRecording);
    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if(recorderContainer){
    init();
}