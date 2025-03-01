import { World } from "koota";
import { Input, Player } from "../traits";
import p5 from "p5";

export function pollInputsP5(world: World, sketch: p5) {
  // const { key } = e;
  world.query(Input, Player).updateEach(([input, player]) => {
    const { controlsScheme } = player;

    let horizontal = 0;
    let vertical = 0;

    switch (controlsScheme) {
      // y axis uses an inverted plain for DOM coordinate system
      // thus we need to invert the vertical axis input
      case "wasd":
        horizontal =
          (sketch.key === "d" ? 1 : 0) - (sketch.key === "a" ? 1 : 0);
        vertical = (sketch.key === "s" ? 1 : 0) - (sketch.key === "w" ? 1 : 0);
        console.log(sketch.key);
        break;

      case "arrows":
        horizontal =
          (sketch.keyCode === sketch.RIGHT_ARROW ? 1 : 0) -
          (sketch.keyCode === (sketch.LEFT_ARROW as number) ? 1 : 0);
        vertical =
          (sketch.keyCode === sketch.DOWN_ARROW ? 1 : 0) -
          (sketch.keyCode === sketch.UP_ARROW ? 1 : 0);
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
}
