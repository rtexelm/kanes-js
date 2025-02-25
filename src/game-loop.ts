import { applyInput } from "./systems/applyInput";
import { pollInput } from "./systems/pollInputs";
import { syncRenderer } from "./systems/syncRenderer";
import { updateMovement } from "./systems/updateMovement";
import { updatePlayerView } from "./systems/updatePlayerView";
import { updateSegments } from "./systems/updateSegments";
import { updateTime } from "./systems/updateTime";
import { world } from "./world";

export function gameLoop() {
  // Input phase
  updateTime(world);
  pollInput(world);

  // Update phase
  applyInput(world);
  updateMovement(world);
  updateSegments(world);
  updatePlayerView(world);

  // Sync phase
  syncRenderer(world);

  requestAnimationFrame(gameLoop);
}
