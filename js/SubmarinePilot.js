class SubmarinePilot {
  constructor(x, y, shape, color) {
    //init position, shape, and movement properties
    this.x = x || 0;
    this.y = y || 0;
    this.xDir = 1;
    this.s = 4;
    this.color = color || "blue";
    this.shape = shape || [
      0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0,
    ]; // submarine-ish shape in a binary array
    this.speed = 0.05;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isShooting = false;
    this.bullet = { x: this.x, y: this.y, s: 3 };
  }

  //allows shooting if shooting isn;t in progress
  shoot() {
    if (!this.isShooting) {
      this.bullet = { x: this.x + this.s / 2, y: this.y, s: 3 };
      this.isShooting = true;
    }
  }

  update() {
    //update the sub's position based on the movement flags
    if (this.x > 0 && this.isMovingLeft) {
      this.x -= this.speed * dt;
    }
    if (this.x < w / 4 - this.s && this.isMovingRight) {
      // Move right if not at the right boundary
      this.x += this.speed * dt;
    }

    // Update the bullet's position if it is being shot
    if (this.isShooting) {
      this.bullet.y -= 0.1 * dt; // Move bullet upwards
      if (this.bullet.y < 0) {
        // Reset bullet if it moves off the screen
        this.isShooting = false;
        this.bullet = {};
      }
    }
  }

  show() {
    //render the sub
    c.fillStyle = this.color;
    for (let i = 0; i < this.shape.length; i++) {
      //
      if (this.shape[i]) {
        c.fillRect(
          (this.x + (i % 8)) * this.s,
          (this.y + Math.floor(i / 8)) * this.s,
          this.s,
          this.s
        );
      }
    }

    //render the bullet
    if (this.isShooting) {
      c.fillRect(
        this.bullet.x * this.s,
        this.bullet.y * this.s,
        this.bullet.s,
        this.bullet.s
      );
    }
    this.update(); // Update the sub's position and bullet
  }
}
