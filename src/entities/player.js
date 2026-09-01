import { preloadEntities } from "../core/assets.js";

export class Player {
  constructor(game) {
    this.game = game;

    this.lane;

    this.pivotX;
    this.pivotY = this.game.canvas.height - 100;
    this.size = 85;

    this.hitbox;

    this.isSwitchedLane = false;
    this.isCollided = false;

    this.generatePlayer();
  }

  switchLane() {
    const recentKey = this.game.input.keys[this.game.input.keys.length - 1];

    const switchLeft = ["a", "arrowleft"];
    const switchRight = ["d", "arrowright"];

    if (switchLeft.includes(recentKey)) {
      if (this.lane.pos === "left") return;

      const currentLaneIndex = this.game.lanes.findIndex((lane) => lane.pos === this.lane.pos);

      this.lane = this.game.lanes[currentLaneIndex - 1];
    }
    if (switchRight.includes(recentKey)) {
      if (this.lane.pos === "right") return;

      const currentLaneIndex = this.game.lanes.findIndex((lane) => lane.pos === this.lane.pos);

      this.lane = this.game.lanes[currentLaneIndex + 1];
    }

    this.pivotX = this.lane.pivotX;
    this.isSwitchedLane = true;
  }

  checkIfColision() {
    const activeObstacle = this.game.activeObstacle;

    activeObstacle.forEach((obstacle) => {
      const colisionX =
        this.hitbox.maxX >= obstacle.hitbox.minX && this.hitbox.minX <= obstacle.hitbox.maxX;
      const colisionY =
        this.hitbox.minY <= obstacle.hitbox.maxY && this.hitbox.maxY >= obstacle.hitbox.minY;

      if (colisionX && colisionY) {
        this.isCollided = true;
      }
    });
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

  render(ctx) {
    ctx.save();
    ctx.translate(this.pivotX, this.pivotY);

    const playerImg = preloadEntities.player;
    const playerSize = this.size;

    ctx.drawImage(playerImg, -playerSize / 2, -playerSize / 2, playerSize, playerSize);
    ctx.restore();
  }

  update() {
    this.setHitbox();
    this.checkIfColision();

    if (this.isCollided) {
      return;
    }

    if (this.game.input.keys.length <= 0) {
      this.isSwitchedLane = false;
      return;
    }
    if (this.isSwitchedLane) {
      return;
    }

    this.switchLane();
  }

  generatePlayer() {
    this.lane = this.game.lanes.find((lane) => lane.pos === "middle");
    this.pivotX = this.lane.pivotX;
  }
}
