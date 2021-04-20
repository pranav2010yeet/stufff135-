video=""
status=""
object=[]

function preload(){
video=createVideo("video.mp4")
video.hide();
video.size(500,500)
}

function setup(){
canvas=createCanvas(500,500)
canvas.parent("canvas")
}




function start(){
objectdetector=ml5.objectDetector("cocossd",modelloaded)
document.getElementById("status").innerHTML="Status:Detecting objects"
}
function modelloaded(){
    console.log("model has loaded")
    status=true
    video.loop();
video.speed(1)
video.volume(1)

}

function gotresults(error,results){
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        object=results
    }
}

function draw(){
    image(video,0,0,500,500)
    if (status!="") {
   objectdetector.detect(video, gotresults)
   for (let i = 0; i < object.length; i++) {
  objectname=object[i].label
  document.getElementById("status").innerHTML="Status: Objects Detected"
  document.getElementById("number").innerHTML="Number of objects detected: "+object.length
  accuracy=floor(object[i].confidence*100)+"%"
       x=object[i].x
      y=object[i].y
      width=object[i].width
       height=object[i].height
       fill("red")
       stroke("red")
       text(objectname+accuracy,x,y)
       noFill()
    rect(x,y,width,height)
    
   }
    }
}                    

