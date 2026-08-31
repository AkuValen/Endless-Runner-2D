export class Player {
  constructor(game) {
    this.game = game;

    this.lane;

    this.pivotX;
    this.pivotY = this.game.canvas.height - 100;

    this.isSwitchedLane = false;

    this.initPlayer();
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

  update() {
    if (this.game.input.keys.length <= 0) {
      this.isSwitchedLane = false;
      return;
    }
    if (this.isSwitchedLane) {
      return;
    }

    this.switchLane();
  }

  initPlayer() {
    this.lane = this.game.lanes.find((lane) => lane.pos === "middle");
    this.pivotX = this.lane.pivotX;
  }
}
