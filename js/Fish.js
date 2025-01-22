class Fish {
  constructor(x, y, shape, color, speed) {
    //init the position, shape, and movement properties
    this.x = x || 0;
    this.y = y || 0;
    this.xDir = 1;
    this.s = 4;
    this.i = 0;
    this.speed = speed !== undefined ? speed : 0.008;
    this.frame = 0;
    this.dir = Math.random() < 0.5 ? -1 : 1;
    this.maxFrame = Math.floor(Math.random() * 32) + 16;
    this.color = color || "black";
    this.shape = [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0];
    this.isAlive = true;
    this.fit = 0; //fitness value based on vertical progress
  }

  //updates an fishs score
  update() {
    if (this.y >= h >> 2) {
      // fish has reached the sub's zone
      lives++;
      this.isAlive = false;
      return;
    }

    if (!this.shape[this.i]) {
      // move horizontally if the current shape index is empty
      let value = this.dir * this.speed * dt; // Movement step size
      if (
        this.x + value > 0 &&
        (this.x + value) * this.s < w - this.s * this.s
      ) {
        this.x += value; //update x-position within boundaries
      }
    }

    this.y += this.speed * dt; //move the fish downward

    if (this.frame === this.maxFrame) {
      //change direction and update the shape index after a set number of frames
      this.dir = -this.dir;
      this.frame = 0;
      this.maxFrame = Math.floor(Math.random() * 32) + 16;
      this.i = ++this.i % this.shape.length;
    }

    //increment frame counter and update the fitness value based on the y progress
    this.frame++;
    this.fit = Math.round(this.y);

    //check for collision with the sub's bullet
    if (
      Math.sqrt(
        (sub.bullet.y - this.y) ** 2 + (sub.bullet.x - (this.x + 2)) ** 2
      ) < 2.5
    ) {
      //distance between bullet and fish
      let x = sub.bullet.x;
      let y = sub.bullet.y;
      let area = c.getImageData(
        x * this.s,
        y * this.s,
        sub.bullet.s + 1,
        sub.bullet.s
      );
      //see if the bullet overlaps with the fish
      for (let i = 0; i < area.data.length; i++) {
        if (area.data[i]) {
          this.isAlive = false;
          sub.bullet = {};
          sub.isShooting = false;
          break;
        }
      }
    }
  }

  show() {
    //render fish
    if (this.isAlive) {
      c.fillStyle = this.color; //set fill color for the fish
      for (let i = 0; i < this.shape.length; i++) {
        //draw the fish's shape based on the binary array
        if (this.shape[i]) {
          c.fillRect(
            (this.x + (i % 4)) * this.s,
            (this.y + (i >> 2)) * this.s,
            this.s,
            this.s
          );
        }
      }
      this.update();
    }
  }
}
