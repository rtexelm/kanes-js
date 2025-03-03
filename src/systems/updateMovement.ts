import { World } from "koota";
import { Length, Position, Segments, Time, Velocity } from "../traits";

export function updateMovement(world: World) {
  const { delta } = world.get(Time)!;

  world
    .query(Position, Velocity, Segments, Length)
    .updateEach(([position, velocity, segments, length]) => {
      position.x += velocity.x * delta;
      position.y += velocity.y * delta;
    });
}
