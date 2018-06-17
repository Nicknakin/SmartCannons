var cannons = [];
var numCannons = 200;
var r = 30;
var genAlive;
var bestAverage = Infinity;

let target;

function setup(){
  createCanvas(800,800);
  startGeneration();
}

function draw(){
if(genAlive){
    genAlive = false;
    rectMode(CORNER);
    background(0);
    fill(255,0,0);
    noStroke();
    ellipse(target[0],target[1],60)
    cannons.forEach((cannon) => {
      cannon.draw();
      cannon.update();
      if(cannon.live){
        genAlive = true;
      }
    });
  }
  else{
    cannons.forEach((cannon) => {
      cannon.distance = Math.pow(cannon.ball.x-target[0], 2) + Math.pow(cannon.ball.y-target[1], 2);
    });
    for(let i = 0; i < 1; i++){
      let lowest = i;
      for(let k = i; k < cannons.length; k++){
        if(cannons[lowest].distance > cannons[k].distance)
          lowest = k;
      }
      let temp = cannons[i];
      cannons[i] = cannons[lowest];
      cannons[lowest] = temp;
    }
    tf.tidy(() => {
      for(let i = 1; i < cannons.length; i++){
        cannons[i].y = Math.random()*(height-2*r)+r;
        let oldBrain = cannons[i].brain;
        if(Math.round(Math.random()))
          cannons[i].brain = cannons[i].merge(cannons[0]).duplicate();
        else
          cannons[i].brain = cannons[0].merge(cannons[i]).duplicate();
        tf.dispose(oldBrain);
        cannons[i].brain.mutate();
      }
    });
    startGeneration();
  }

}

function startGeneration(){
  if(cannons.length != numCannons)
    for(let i = cannons.length; i < numCannons; i++){
      cannons.push(new Cannon(30, Math.floor(Math.random()*(height-2*r)+r), r, getRandomColor()));
    }

  target = newTarget();
  cannons.forEach((cannon) => {
    cannon.predict()
    cannon.launch();
  });
  genAlive = true;
}

function newTarget(){
  let bool = Math.round(Math.random());
  return [width, height];
  //return [width-Math.random()*width*bool/2, height-Math.random()*height*(1-bool)/2];
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color+"88";
}
