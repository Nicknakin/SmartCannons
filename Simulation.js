var cannons = [];
var numCannons = 50;
var r = 30;
var genAlive;

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
  fill(255);
  noStroke();
  ellipse(target[0],target[1],16)
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
      cannon.distance = Math.sqrt(Math.pow(cannon.ball.x-target[0], 2) + Math.sqrt(cannon.ball.y-target[1], 2));
    });
    for(let i = 0; i < cannons.length; i++){
      let highest = i;
      for(let k = i; k < cannons.length; k++){
        if(cannons[highest].distance < cannons[k].distance)
          highest = k;
      }
      let temp = cannons[i];
      cannons[i] = cannons[highest];
      cannons[highest] = temp;
    }

    for(let i = 1; i < cannons.length; i++){
      cannons[i].y = Math.floor(Math.random()*(height-2*r)+r);
      if(Math.random() > 0.5)
        cannons[i].brain = cannons[i].merge(cannons[0]).brain.duplicate();
      else
        cannons[i].brain = cannons[0].merge(cannons[i]).brain.duplicate();
    }

    startGeneration();
  }

}

function startGeneration(){
  if(cannons.length != numCannons)
    for(let i = 0; i < numCannons; i++){
      cannons.push(new Cannon(30, Math.floor(Math.random()*(height-2*r)+r), r, getRandomColor()));
    }

  target = newTarget();
  cannons.forEach((cannon) => {
    cannon.predict(target)
    cannon.launch();
  });
  genAlive = true;
}

function newTarget(){
  let bool = Math.round(Math.random());
  return [width-Math.random()*width*bool, height-Math.random()*height*(1-bool)];
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color+"44";
}