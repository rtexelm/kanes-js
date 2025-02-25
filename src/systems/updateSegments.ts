import { World } from "koota";
import { Position, prevVelocity, Velocity } from "../traits";

export function updateSegments(world: World) {
  const results = world.query(Position, Velocity, prevVelocity);
}
