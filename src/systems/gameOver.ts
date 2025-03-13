// TODO
// Stop frames
// Render text
// Add restart button

import { World } from "koota";
import { inPlay } from "../traits";

export function gameOver(world: World) {
  if (world.has(inPlay)) {
    world.remove(inPlay);
  }
}
