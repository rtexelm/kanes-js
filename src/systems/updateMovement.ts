import { World } from "koota";
import { Position, Time, Velocity } from "../traits";

export function updateMovement(world: World) {
  const { delta } = world.get(Time)!;

  world.query(Position, Velocity).updateEach(([position, velocity]) => {
    position.x += velocity.x * delta;
    position.y += velocity.y * delta;
  });
}
