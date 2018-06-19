
class CannonBall{
    constructor(x, y, r, color, angle, power){
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = 0.25;
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
