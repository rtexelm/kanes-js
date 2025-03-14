import p5 from "p5";
import {
  applyInput,
  applyInputP5,
  pollInput,
  pollInputQR,
  syncRenderer,
  syncRendererP5,
  updateMovement,
  updateMovementP5,
  updatePlayerView,
  updateTime,
  updateSegments,
  detectCollisions,
  updateGrid,
  spawnFood,
  enforceCollisions,
  showSplashScreen,
} from "./systems";
import { world } from "./world";
import { inPlay } from "./traits";

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
  const playing = world.has(inPlay);
  // Input phase
  if (playing) {
    updateTime(world);
    pollInputQR(world, sketch);

    // Update phase
    applyInputP5(world);
    updateMovementP5(world);
    updateSegments(world);
    detectCollisions(world);
    enforceCollisions(world);
    spawnFood(world);
    updateGrid(world);

    // Sync phase
    syncRendererP5(world, sketch);
  } else {
    // TODO: Add game over screen
    showSplashScreen(world, sketch);
  }
}
