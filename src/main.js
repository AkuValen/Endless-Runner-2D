import { configGameData } from "./core/assets.js";
import { InputHandler } from "./core/input.js";
import { generateCanvas, renderCanvas } from "./core/display.js";

import { Lane } from "./world/lane.js";
import { Player } from "./entities/player.js";

import { updateObstacle, renderObstacle } from "./core/obstacleManager.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("game-canvas");

    this.input = new InputHandler(this);
    this.loopId;
    this.isEnd = false;

    this.time = {
      second: 0,
      tick: false,
    };
    this.timeAccumulator = 0;
    this.lastTime = 0;

    this.laneData = new Lane();
    this.lanes = [];

    this.player;
    this.activeObstacle = [];

    this.start();
  }

  endGame() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);

      this.loopId = null;
      this.isEnd = true;
    }
  }

  timeCounter(timestamp) {
    if (this.lastTime <= 0) this.lastTime = timestamp;

    let deltaTime = timestamp - this.lastTime;

    this.timeAccumulator += deltaTime;

    if (this.timeAccumulator >= 1000) {
      this.timeAccumulator -= 1000;

      this.time.second++;
      this.time.tick = true;
    } else {
      this.time.tick = false;
    }

    this.lastTime = timestamp;
  }

  resume() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
    }

    this.loopId = requestAnimationFrame((timestamp) => {
      this.lastTime = timestamp;
      return this.loop(timestamp);
    });
  }

  render() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    renderCanvas(this.canvas, ctx);

    this.lanes.forEach((lane, index) => {
      lane.drawLane(ctx, index);
    });

    renderObstacle(this, ctx);

    if (this.player) {
      this.player.render(ctx);
    }
  }

  update() {
    if (this.player.isCollided) {
      this.player = null;

      this.endGame();
      return;
    }

    this.player.update();
    updateObstacle(this);
  }

  loop(timestamp) {
    if (this.isEnd) {
      return;
    }

    this.timeCounter(timestamp);

    this.update();
    this.render();

    if (!this.input.isFocus) {
      cancelAnimationFrame(this.loopId);
    } else {
      this.loopId = requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
  }

  start() {
    this.laneData.generateLane(this);
    generateCanvas(this);

    this.player = new Player(this);

    this.loopId = requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
}

window.addEventListener("load", () => {
  configGameData().then(() => {
    new Game();
  });
});
