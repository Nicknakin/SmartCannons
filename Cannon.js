class Cannon{
  constructor(x, y, r, color, bool){
    this.x = x;
    this.y = height-y;
    this.angle = 0;
    this.brain = (!bool)? new NeuralNet(3, 3, 2): null;
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
    this.live = true;
    this.ball = new CannonBall(this.x, this.y, 8, this.color, this.angle, this.power);
  }

  update(){
    if(this.ball.move()){
      this.live = false;
    }
  }

  predict(target){
    let prediction = this.brain.predict([target[0], target[1], this.y]);
    this.angle = Math.PI*(prediction[0]-1/2);
    this.power = 5/prediction[1];
    this.calcCannonEnd();
  }

  merge(that){
    return this.brain.merge(that.brain);
  }
}
