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
  ellipse(target[0],target[1],8)
    cannons.forEach((cannon) => {
      cannon.draw();
      cannon.update();
      if(cannon.live){
        genAlive = true;
      }
    });
  }


}

function startGeneration(){
  for(let i = 0; i < numCannons; i++){
    cannons.push(new Cannon(30, Math.floor(Math.random()*(height-2*r)+r), r, getRandomColor()));
  }
  target = [width/2+80, height];
  cannons.forEach((cannon) => {
    cannon.predict(target)
    cannon.launch();
  });
  genAlive = true;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color+"88";
}
