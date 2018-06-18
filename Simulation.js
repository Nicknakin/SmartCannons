var cannons = [];
var numCannons = 100;
var r = 30;
var genAlive;
var generation = 1;
var average;
var bestAverage = Infinity;

let target;

function setup(){
  createCanvas(800,800);
  startGeneration();
  for(let i = 0; i < numCannons; i++){
    cannons.push(new Cannon(30, height/2+Math.floor((Math.random()-0.5)*height/4), r, getRandomColor()));
  }
  target = newTarget();
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
    newGeneration();
  }
}

function newGeneration(){
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
  for(let i = 1; i < cannons.length; i++){
    let oldBrain = cannons[i].brain;
    if(Math.round(Math.random()))
      cannons[i].brain = cannons[i].merge(cannons[0]).duplicate();
    else
      cannons[i].brain = cannons[0].merge(cannons[i]).duplicate();
    cannons[i].brain.mutate();
  }
  startGeneration();
}

function startGeneration(){
  let newCannons = [];
  tf.tidy(() => {
    let i = 0;
    cannons.forEach((cannon) => {
      newCannons.push(new Cannon(cannon.x, cannon.y, cannon.r, cannon.color, cannon.brain.duplicate()));
    })
  });

  cannons = newCannons;

  generation++;
  cannons.forEach((cannon) => {
    cannon.predict()
    cannon.launch();
  });
  genAlive = true;
}

function newTarget(){
  let bool = Math.round(Math.random());
  return [width, height*3/4];
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
