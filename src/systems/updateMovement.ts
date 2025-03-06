import { World } from "koota";
import { Position, Time, Velocity, Grid } from "../traits";

export function updateMovement(world: World) {
  const { delta } = world.get(Time)!;

  world.query(Position, Velocity).updateEach(([position, velocity]) => {
    position.x += velocity.x * delta;
    position.y += velocity.y * delta;
  });
}

export function updateMovementP5(world: World) {
  world.query(Position, Velocity).updateEach(([position, velocity]) => {
    position.x += velocity.x;
    position.y += velocity.y;
  });
}

// if (position.x < 0) position.x = world.gridWidth - 1;
// else if (position.x >= world.gridWidth) position.x = 0;
// if (position.y < 0) position.y = world.gridHeight - 1;
// else if (position.y >= world.gridHeight) position.y = 0;
