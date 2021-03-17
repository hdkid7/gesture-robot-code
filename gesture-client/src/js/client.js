const fetch = require('node-fetch');
const data = { username: 'example' };

// const s = (sketch) => {
//   let video;
//   let poseNet;
//   let pose;
//   let skeleton;

//   let brain;
//   let poseLabel = "A";

//   var serial;                            
//   var baud = { baudrate: 9600};     
//   var portName = 'COM3'; 
//   var outByte=0;


//   function serialError(err) {
//     console.log('Something went wrong with the serial port. ' + err);
//   }
  
//   function brainLoaded() {
//     console.log('pose classification ready!');
//     classifyPose();
//   }
  
//   function classifyPose() {
//     if (pose) {
//       let inputs = [];
//       for (let i = 0; i < pose.keypoints.length; i++) {
//         let x = pose.keypoints[i].position.x;
//         let y = pose.keypoints[i].position.y;
//         inputs.push(x);
//         inputs.push(y);
//       }
//       brain.classify(inputs, gotResult);
//     } else {
//       setTimeout(classifyPose, 100);
//     }
//   }
  
//   function gotResult(error, results) {
    
//     if (results[0].confidence > 0.75) {
//       poseLabel = results[0].label.toUpperCase();
//     }
//     //console.log(results[0].confidence);
//     classifyPose();
//   }
  
  
//   function gotPoses(poses) {
//     if (poses.length > 0) {
//       pose = poses[0].pose;
//       skeleton = poses[0].skeleton;
//     }
//   }
  
  
//   function modelLoaded() {
//     console.log('poseNet ready');
//   }
  

//   sketch.setUp = () => {
//     sketch.createCanvas(640, 480);
//     serial = new p5.SerialPort();
//     serial.on('error', serialError); 
//     serial.open(portName, baud);
      
//     video = sketch.createCapture(sketch.VIDEO);


//     video.hide();
//     poseNet = ml5.poseNet(video, modelLoaded);
//     poseNet.on('pose', gotPoses);

//     let options = {
//       inputs: 34,
//       outputs: 5,
//       task: 'classification',
//       debug: true
//     }
//     brain = ml5.neuralNetwork(options);
//     const modelInfo = {
//       model: 'model/model.json',
//       metadata: 'model/model_meta.json',
//       weights: 'model/model.weights.bin',
//     };
//     brain.load(modelInfo, brainLoaded);
//   }


//   sketch.draw = () => {
//     sketch.push();
//   sketch.translate(video.width, 0);
//   sketch.scale(-1, 1);
//   sketch.image(video, 0, 0, video.width, video.height);

//   if (pose) {
//     for (let i = 0; i < skeleton.length; i++) {
//       let a = skeleton[i][0];
//       let b = skeleton[i][1];
//       sketch.strokeWeight(2);
//       sketch.stroke(0);

//       sketch.line(a.position.x, a.position.y, b.position.x, b.position.y);
    
//       for (let i = 0; i < pose.keypoints.length; i++) {
//         let x = pose.keypoints[i].position.x;
//         let y = pose.keypoints[i].position.y;
//         sketch.fill(0);
//         sketch.stroke(255);
//         sketch.ellipse(x, y, 16, 16);
//       }
//     }
  
//     sketch.pop();
//     sketch.fill(255, 0, 255);
//     sketch.noStroke();
//     sketch.textSize(512);
//     sketch.textAlign(CENTER, CENTER);
//     sketch.text(poseLabel, width / 2, height / 2);
  
//     //serial.write(poseLabel);
//     console.log(poseLabel);
    
    
    
//     }
//   }





// }



// let myp5 = new p5(s);
















// fetch('http://localhost:8082/sendble', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });