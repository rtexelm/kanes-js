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
  showSplashScreen,
  applyInputQR,
  updateRoundEnd,
  detectRoundEnd,
  handleReset,
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
  if (playing) {
    // Input phase
    updateTime(world);
    // pollInputQR(world, sketch);

    // Update phase
    applyInputP5(world);
    updateMovementP5(world);
    updateSegments(world);
    detectCollisions(world);
    detectRoundEnd(world);
    updateRoundEnd(world);
    spawnFood(world);
    updateGrid(world);

    // Sync phase
    syncRendererP5(world, sketch);

    // Reset phase
    handleReset(world);
  } else {
    showSplashScreen(world, sketch);
    pollInputQR(world, sketch);
  }
}
