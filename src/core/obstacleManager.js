import { Obstacle } from "../entities/obstacle.js";
import { preloadEntities } from "./assets.js";

export function renderObstacle(game, ctx) {
  game.activeObstacle.forEach((obstacle) => {
    ctx.save();
    ctx.translate(obstacle.pivotX, obstacle.pivotY);

    const obstacleImg = preloadEntities.obstacle;
    const obstacleSize = obstacle.size;

    ctx.drawImage(obstacleImg, -obstacleSize / 2, -obstacleSize / 2, obstacleSize, obstacleSize);
    ctx.restore();
  });
}

let obstacleSpeed = 2;
let spawnInterval = 5;

function increaseDifficulty(game) {
  if (game.time.second % 10 == 0) {
    obstacleSpeed += 0.2;
  }
  if (game.time.second % 50 == 0) {
    if (spawnInterval >= 2) spawnInterval -= 1;
  }
}

function spawnObstacle(game) {
  const randIndex = Math.floor(Math.random() * game.lanes.length);
  const isObstacle = Math.random() < 0.5;

  if (isObstacle) {
    const lanePivotX = game.lanes[randIndex].pivotX;

    game.activeObstacle.push(new Obstacle(game, lanePivotX, obstacleSpeed));
  } else {
    const lanes = game.lanes.filter((lane, index) => index != randIndex);

    lanes.forEach((lane) => {
      game.activeObstacle.push(new Obstacle(game, lane.pivotX, obstacleSpeed));
    });
  }
}

let cooldown = 3;

export function updateObstacle(game) {
  if (game.time.tick) {
    cooldown--;
    console.log(game.time.second);

    if (cooldown <= 0) {
      spawnObstacle(game);
      cooldown += spawnInterval;
    }

    increaseDifficulty(game);
  }

  game.activeObstacle.forEach((obstacle) => {
    obstacle.setHitbox();
    obstacle.move();
  });

  game.activeObstacle = game.activeObstacle.filter((obstacle) => {
    return obstacle.pivotY <= game.canvas.height;
  });
}
