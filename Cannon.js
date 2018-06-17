class Cannon{
  constructor(x, y, r, color){
    this.x = x;
    this.y = height-y;
    this.angle = 0;
    this.power = 10;
    this.brain = new NeuralNet(1, 4, 2);
    this.color = color;
    this.r = r;
    this.calcCannonEnd();
    this.live;
    this.ball;
    this.distance = 0;
  }

  draw(){
    let col = color(this.color);
    noStroke();
    fill(col);
    ellipse(this.x, this.y, this.r*2);
    rect(0, this.y+this.r, this.x+this.r/4, 10);
    strokeWeight(16);
    stroke(col);
    line(this.x, this.y, this.cannonEnd.x, this.cannonEnd.y);
    this.ball.draw();
  }

  calcCannonEnd(){
    let length = Math.round(this.r*1.35);
    this.cannonEnd = {x:this.x+length*Math.cos(this.angle), y:this.y+length*Math.sin(this.angle)};
  }

  launch(){
    this.calcCannonEnd();
    this.live = true;
    this.ball = new CannonBall(this.x, this.y, 8, this.color, this.angle, this.power);
  }

  update(){
    if(this.ball.move()){
      this.live = false;
    }
  }

  predict(){
    let prediction = this.brain.predict([this.y]);
    this.angle = 2*Math.PI*(prediction[0]-1/2);
    this.power = 20*prediction[1];
  }

  merge(that){
    return this.brain.merge(that.brain);
  }
}
