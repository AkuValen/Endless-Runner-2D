import { configGameData, preloadEntities } from "./core/assets.js";
import { InputHandler } from "./core/input.js";

import { Lane } from "./world/lane.js";
import { Player } from "./entities/player.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.config = configGameData();
    this.input = new InputHandler();

    this.time = 0;
    this.timeAccumulator = 0;
    this.lastTime = 0;

    this.laneData = new Lane();
    this.lanes = [];

    this.player;
    this.activeObstacle;

    this.start();
  }

  timeCounter(timestamp) {
    if (this.lastTime <= 0) this.lastTime = timestamp;

    let deltaTime = timestamp - this.lastTime;
    this.timeAccumulator += deltaTime;

    if (this.timeAccumulator >= 1000) {
      this.timeAccumulator -= 1000;
      this.time++;

      console.log(this.time);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#49542a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.lanes.forEach((lane, index) => {
      lane.drawLane(index);
    });

    this.ctx.save();
    this.ctx.translate(this.player.pivotX, this.player.pivotY);

    const playerImg = preloadEntities.player;
    const playerSize = 85;

    this.ctx.drawImage(playerImg, -playerSize / 2, -playerSize / 2, playerSize, playerSize);
    this.ctx.restore();
  }

  update() {
    this.player.update();
  }

  loop(timestamp) {
    this.timeCounter(timestamp);

    this.update();
    this.render();

    this.lastTime = timestamp;
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  start() {
    const pos = ["left", "middle", "right"];

    pos.forEach((pos, index) => {
      this.lanes.push(new Lane(this, pos, index));
    });

    this.canvas.height = window.innerHeight;
    this.canvas.width = this.lanes.length * this.laneData.width;

    this.player = new Player(this);

    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
}

window.addEventListener("load", () => {
  new Game();
});
