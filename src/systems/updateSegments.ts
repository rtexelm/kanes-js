import { World } from "koota";
import { Position, PrevVelocity, Velocity } from "../traits";

export function updateSegments(world: World) {
  const results = world.query(Position, Velocity, PrevVelocity);
}
