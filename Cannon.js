class Cannon{
  constructor(x, y, r, color){
    this.x = x;
    this.y = height-y;
    this.angle = 0;
    this.brain = new NeuralNet(3, 3, 2);
    this.color = color;
    this.r = r;
    this.calcCannonEnd();
    this.live;
    this.ball;
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
    this.power = 1/prediction[1];
    this.calcCannonEnd();
  }

}

 class CannonBall{
   constructor(x, y, r, color, angle, power){
     this.x = x;
     this.y = y;
     this.r = r;
     this.a = 0.1;
     this.color = color;
     this.angle = -(angle%Math.PI);
     this.velocity = [power*Math.cos(this.angle), power*Math.sin(this.angle)];
   }

   move(){
     if(this.y >= height || this.x >= width || this.x <= 0 || this.y <= 0){
      this.x = (this.x >= width)? width: this.x;
      this.y = (this.y >= height)? height: this.y;
      this.velocity = [0, 0];
      this.a = 0;
      return true;
    }
    else{
     this.x += this.velocity[0];
     this.y -= this.velocity[1];
     this.velocity[1] -= this.a;
    }
    return false;
   }

   draw(){
     fill(this.color);
     noStroke();
     ellipse(this.x, this.y, this.r);
   }
 }
