export class Obstacle {
  constructor(game, pivotX) {
    this.game = game;

    this.pivotX = pivotX;
    this.pivotY = 0;

    this.speed = 2;
  }

  move() {
    this.pivotY += this.speed;
  }
}
