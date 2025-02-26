import { World } from "koota";
import { Input, Player } from "../traits";

// Poll the input from the user with dom system
const keys = {
  arrowUp: false,
  arrowDown: false,
  arrowLeft: false,
  arrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

window.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "arrowup":
    case "w":
      keys.arrowUp = true;
      keys.w = true;
      break;
    case "arrowdown":
    case "s":
      keys.arrowDown = true;
      keys.s = true;
      break;
    case "arrowleft":

    case "a":
      keys.arrowLeft = true;

      keys.a = true;

      break;

    case "arrowright":

    case "d":
      keys.arrowRight = true;

      keys.d = true;

      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key.toLowerCase()) {
    case "arrowup":

    case "w":
      keys.arrowUp = false;

      keys.w = false;

      break;

    case "arrowdown":

    case "s":
      keys.arrowDown = false;

      keys.s = false;

      break;

    case "arrowleft":

    case "a":
      keys.arrowLeft = false;

      keys.a = false;

      break;

    case "arrowright":

    case "d":
      keys.arrowRight = false;

      keys.d = false;

      break;
  }
});

export function pollInput(world: World) {
  world.query(Input, Player).updateEach(([input, player]) => {
    // Get horizontal and vertical input.

    const { controlsScheme } = player;

    let horizontal = 0;
    let vertical = 0;

    switch (controlsScheme) {
      // y axis uses an inverted plain for DOM coordinate system
      // thus we need to invert the vertical axis input
      case "wasd":
        horizontal = (keys.d ? 1 : 0) - (keys.a ? 1 : 0);
        vertical = (keys.s ? 1 : 0) - (keys.w ? 1 : 0);
        break;

      case "arrows":
        horizontal = (keys.arrowRight ? 1 : 0) - (keys.arrowLeft ? 1 : 0);
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
}
