import p5 from "p5";
import { applyInput, applyInputP5 } from "./systems/applyInput";
import { pollInput } from "./systems/pollInputs";
import { syncRenderer, syncRendererP5 } from "./systems/syncRenderer";
import { updateMovement, updateMovementP5 } from "./systems/updateMovement";
import { updatePlayerView } from "./systems/updatePlayerView";
import { updateTime } from "./systems/updateTime";
import { world } from "./world";
import { updateSegments } from "./systems/updateSegments";
import { detectCollisions } from "./systems/detectCollisions";
import { updateGrid } from "./systems/updateGrid";
import { spawnFood } from "./systems/spawnFood";

export function gameLoop() {
  /**
   * Game loop
   * Input -> Update -> Sync
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

export function gameLoopP5(sketch: p5) {
  /**
   * Call this function in the draw() loop of p5 to update the game
   */
  // Input phase
  updateTime(world);

  // Update phase
  applyInputP5(world);
  updateMovementP5(world);
  updateSegments(world);
  detectCollisions(world);
  spawnFood(world);
  updateGrid(world);

  // Sync phase
  syncRendererP5(world, sketch);
}
