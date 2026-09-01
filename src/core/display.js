export function generateCanvas(game) {
  game.canvas.height = 800;
  game.canvas.width = game.lanes.length * game.laneData.width;
}

export function renderCanvas(canvas, ctx) {
  ctx.fillStyle = "#49542a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
