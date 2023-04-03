
// const {axios} = require('axios')
let audioChunks = [];

 const recordButton = document.getElementById('recordButton');
 const stopButton = document.getElementById('stopButton');
 const playButton = document.getElementById('playButton');
 const download = document.getElementById('Download')
 const audio = document.getElementById('audio');
 let mediaRecorder;
 
 const constraints = {
 audio: {
 sampleRate: 44100,
 channelCount: 2,
 mimeType: 'audio/wav'
 },
 video: false
 };
 
 
 
 function startRecording() {
   audioChunks = [];
   navigator.mediaDevices.getUserMedia(constraints)
     .then(function(stream) {
       mediaRecorder = new MediaRecorder(stream);
       mediaRecorder.ondataavailable = function(e) {
         audioChunks.push(e.data);
       };
       mediaRecorder.onstop = function() {
         const audioBlob = new Blob(audioChunks,{'type':'audio/ogg; codecs=opus'});
         const form = new FormData()
         form.append('recording',audioBlob)
         axios.post('/upload',form,{
          'Content-Type':'multipart/form-data'
         })
        // fetch('/upload',{
        //   method:'POST',
        //   body:JSON.stringify(audioBlob),
        //   // headers:'Content-Type:multipart/form-data'
        // }).then(()=>{
        //   console.log('uploaded')
        // }).catch(err=>console.log(err))
         audio.src = URL.createObjectURL(audioBlob);
         playButton.disabled = false;
       };
       mediaRecorder.start();
     })
     .catch(function(err) {
       console.log('The following error occurred: ' + err);
     });
 }
 
 function stopRecording() {
   mediaRecorder.stop();
   recordButton.disabled = false;
   stopButton.disabled = true;
   playButton.disabled = false;
 }
 
 function playAudio() {
   if (audio.paused) {
     audio.play();
     playButton.innerHTML = "Pause";
   } else {
     audio.pause();
     playButton.innerHTML = "Play";
   }
 }
 
 recordButton.addEventListener('click', function() {
 
   recordButton.disabled = true;
   stopButton.disabled = false;
   playButton.disabled = true;
   startRecording();
 });
 
 stopButton.addEventListener('click', function() {
   recordButton.disabled = false;
   stopButton.disabled = true;
   playButton.disabled = false;
   stopRecording();
 });
 
 playButton.addEventListener('click', function() {
 playAudio()
 });

 