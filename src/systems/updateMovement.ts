import { World } from "koota";
import { Position, Time, Velocity, Grid, Wrap } from "../traits";

export function updateMovement(world: World) {
  const { delta } = world.get(Time)!;

  world.query(Position, Velocity).updateEach(([position, velocity]) => {
    position.x += velocity.x * delta;
    position.y += velocity.y * delta;
  });
}

export function updateMovementP5(world: World) {
  world.query(Position, Velocity).updateEach(([position, velocity]) => {
    const wrap = world.has(Wrap);
    const { dimensions } = world.get(Grid)!;
    position.x += velocity.x;
    position.y += velocity.y;

    // If wrapping is enabled, handle wrapping logic
    if (wrap) {
      if (position.x < 0) position.x = dimensions.x - 1;
      else if (position.x >= dimensions.x) position.x = 0;
      if (position.y < 0) position.y = dimensions.y - 1;
      else if (position.y >= dimensions.y) position.y = 0;
    }
  });
}
