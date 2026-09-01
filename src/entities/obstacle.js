export class Obstacle {
  constructor(game, pivotX, speed) {
    this.game = game;

    this.pivotX = pivotX;
    this.pivotY = 0;
    this.size = 85;

    this.hitbox;

    this.speed = speed;

    this.setHitbox();
  }
  increaseSpeed() {
    this.speed = this.speed + 4;
  }

  setHitbox() {
    const minX = this.pivotX - this.size / 2;
    const minY = this.pivotY - this.size / 2;

    this.hitbox = {
      minX,
      minY,
      maxX: minX + this.size,
      maxY: minY + this.size,
    };
  }

  move() {
    this.pivotY += this.speed;
  }
}
