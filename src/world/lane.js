export class Lane {
  constructor(game, pos, index) {
    this.game = game;

    this.width = 100;
    this.pos = pos;

    this.pivotX = this.width * index + this.width / 2;
  }

  drawLane(ctx, index) {
    const posX = index * this.width;
    const gap = 4;

    ctx.fillStyle = "#4fd570";
    ctx.fillRect(posX + gap / 2, 0, this.width - gap, this.game.canvas.height);
  }

  generateLane(game) {
    const pos = ["left", "middle", "right"];

    pos.forEach((pos, index) => {
      game.lanes.push(new Lane(game, pos, index));
    });
  }
}
