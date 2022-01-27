video = "";
status1 = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
  canvas = createCanvas(480, 380);
  canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
 function modelLoaded(){
     console.log("Model is loaded");
     status1 = true;
     video.loop();
     video.speed(1);
     video.volume(0);

 }

 function draw(){
     image(video,0, 0, 480, 380);
     if(status1 != ""){
         objectDetector.detect(video,gotResult);
         for(i = 0; i<objects.length;i++){
             document.getElementById("status").innerHTML="Status : Objects Detected";
             document.getElementById("number_of_objects").innerHTML="Number of objects detected are : "+ objects.length;
             percent = floor(objects[i].confidence * 100);
             fill("#ff0000");
             text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
             noFill();
             stroke("#ff0000");
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
         }
     }
    }

function gotResult(error,results){
   if(error){
       console.log(error);
    
   }
   else{console.log(results);
    objects = results;
} 
}