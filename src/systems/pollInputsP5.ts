import { World } from "koota";
import { Input, Player } from "../traits";
import p5 from "p5";

export function pollInputsP5(world: World, sketch: p5) {
  // const { key } = e;
  world.query(Input, Player).updateEach(([input, player]) => {
    const { controlsScheme } = player;

    let horizontal = 0;
    let vertical = 0;

    // Check for "wasd" control scheme
    if (
      controlsScheme === "wasd" &&
      ["w", "a", "s", "d"].includes(sketch.key)
    ) {
      horizontal = (sketch.key === "d" ? 1 : 0) - (sketch.key === "a" ? 1 : 0);
      vertical = (sketch.key === "s" ? 1 : 0) - (sketch.key === "w" ? 1 : 0);
    }

    // Check for "arrows" control scheme
    else if (
      controlsScheme === "arrows" &&
      [
        sketch.UP_ARROW,
        sketch.DOWN_ARROW,
        sketch.LEFT_ARROW,
        sketch.RIGHT_ARROW,
      ].includes(sketch.keyCode)
    ) {
      horizontal =
        (sketch.keyCode === sketch.RIGHT_ARROW ? 1 : 0) -
        (sketch.keyCode === sketch.LEFT_ARROW ? 1 : 0);
      vertical =
        (sketch.keyCode === sketch.DOWN_ARROW ? 1 : 0) -
        (sketch.keyCode === sketch.UP_ARROW ? 1 : 0);
    }

    // Normalize the vector if moving diagonally.

    const length = Math.sqrt(horizontal * horizontal + vertical * vertical);

    if (length > 0) {
      input.x = horizontal / (length || 1);

      input.y = vertical / (length || 1);
    }
    // else {
    //   input.x = 0;

    //   input.y = 0;
    // }
  });
}
