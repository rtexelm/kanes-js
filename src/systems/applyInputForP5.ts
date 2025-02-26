import { World } from "koota";
import { Input, Player } from "../traits";

export function applyInputForP5(world: World) {
  world.query(Input, Player).updateEach(([input, player]) => {
    const { controlsScheme } = player;

    let horizontal = 0;
    let vertical = 0;

    switch (controlsScheme) {
      // y axis uses an inverted plain for DOM coordinate system
      // thus we need to invert the vertical axis input
      case "wasd":
        horizontal = (key === "d" ? 1 : 0) - (key === "a" ? 1 : 0);
        vertical = (keys === "s" ? 1 : 0) - (keys === "w" ? 1 : 0);
        break;

      case "arrows":
        horizontal = (keys === "ArrowRight" ? 1 : 0) - (keys.arrowLeft ? 1 : 0);
        vertical = (keys.arrowDown ? 1 : 0) - (keys.arrowUp ? 1 : 0);
        break;

      default:
        break;
    }

    // Normalize the vector if moving diagonally.

    const length = Math.sqrt(horizontal * horizontal + vertical * vertical);

    if (length > 0) {
      input.x = horizontal / (length || 1);

      input.y = vertical / (length || 1);
    } else {
      input.x = 0;

      input.y = 0;
    }
  });

  function keyPressed() {}

  return keyPressed;
}
