import { applyInput } from "./systems/applyInput";
import { pollInput } from "./systems/pollInputs";
import { syncRenderer } from "./systems/syncRenderer";
import { updateMovement } from "./systems/updateMovement";
import { updatePlayerView } from "./systems/updatePlayerView";
import { updateTime } from "./systems/updateTime";
import { world } from "./world";

export function gameLoop() {
  /**
   * Game loop
   * Input -> Update -> Sync
   * Call this function in the draw() loop of p5 to update the game
   */
  // Input phase
  updateTime(world);
  pollInput(world);

  // Update phase
  applyInput(world);
  updateMovement(world);
  updatePlayerView(world);

  // Sync phase
  syncRenderer(world);

  requestAnimationFrame(gameLoop);
}
