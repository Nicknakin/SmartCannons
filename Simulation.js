var cannons = [];
var numCannons = 100;
var r = 30;
var genAlive;

let target;

function setup(){
  createCanvas(screen.width-20, screen.height-20);
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
      cannon.distance = Math.sqrt(Math.pow(cannon.ball.x-target[0], 2) + Math.pow(cannon.ball.y-target[1], 2));
    });
    for(let i = 0; i < cannons.length; i++){
      let lowest = i;
      for(let k = i; k < cannons.length; k++){
        if(cannons[lowest].distance > cannons[k].distance)
          lowest = k;
      }
      let temp = cannons[i];
      cannons[i] = cannons[lowest];
      cannons[lowest] = temp;
    }

    for(let i = 1; i < cannons.length; i++){
      if(Math.random() > 0.5)
        cannons[i].brain = cannons[i].merge(cannons[0]).duplicate();
      else
        cannons[i].brain = cannons[0].merge(cannons[i]).duplicate();
    }

    cannons = cannons.splice(0,Math.round(numCannons*3/4));

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
  return color+"88";
}
