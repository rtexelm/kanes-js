// TODO
// Stop frames
// Render text
// Add restart button

import { World } from "koota";
import { inPlay } from "../traits";

export function gameOver(world: World) {
  // TODO
  // Remove velocity from the players
  // Display game over screen
  if (world.has(inPlay)) {
    world.remove(inPlay);
  }
}
