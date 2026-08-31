import { Obstacle } from "../entities/obstacle.js";
import { preloadEntities } from "./assets.js";

export function renderObstacle(game, ctx) {
  game.activeObstacle.forEach((obstacle) => {
    ctx.save();
    ctx.translate(obstacle.pivotX, obstacle.pivotY);

    const obstacleImg = preloadEntities.obstacle;
    const obstacleSize = 85;

    ctx.drawImage(obstacleImg, -obstacleSize / 2, -obstacleSize / 2, obstacleSize, obstacleSize);
    ctx.restore();
  });
}

const spawnInterval = 5;
let cooldown = 3;

export function updateObstacle(game) {
  if (game.time.tick) {
    cooldown--;
    console.log(game.time.second);

    if (cooldown <= 0) {
      spawnObstacle(game);
      cooldown += spawnInterval;
    }
  }

  let activeObstacle = game.activeObstacle;

  activeObstacle.forEach((obstacle) => {
    obstacle.move();
  });

  activeObstacle = activeObstacle.filter((obstacle) => {
    return obstacle.pivotY <= game.canvas.height;
  });
}

function spawnObstacle(game) {
  const randIndex = Math.floor(Math.random() * 2);

  const isObstacle = Math.random() < 0.5;

  if (isObstacle) {
    const lanePivotX = game.lanes[randIndex].pivotX;

    game.activeObstacle.push(new Obstacle(game, lanePivotX));
  } else {
    const lanes = game.lanes.filter((lane, index) => index != randIndex);

    lanes.forEach((lane) => {
      game.activeObstacle.push(new Obstacle(game, lane.pivotX));
    });
  }
}
