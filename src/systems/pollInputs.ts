import p5 from "p5";
import { World } from "koota";
import { inPlay, Input, Player, Time, Velocity } from "../traits";
import { actions } from "../actions";
// @ts-ignore
import { qrInputs } from "../jsqr";

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

export function pollInputsP5(world: World, sketch: p5) {
  const { setPlaying } = actions(world);

  const playing = world.has(inPlay);
  world.query(Input, Player).updateEach(([input, player]) => {
    const { controlsScheme } = player;

    let horizontal = 0;
    let vertical = 0;

    if (!playing && sketch.key === "x") setPlaying(true);
    if (sketch.key === "f") {
      let full = sketch.fullscreen();
      sketch.fullscreen(!full);
    }

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
  });
}

const DEBOUNCE = 400;

let lastQRReadTimeL = 0;
let lastQRReadTimeR = 0;

let lastQRReadL: string | null = null;
let lastQRReadR: string | null = null;

export function pollInputQR(world: World, sketch: p5) {
  const { setPlaying } = actions(world);
  const { current } = world.get(Time)!;

  const playing = world.has(inPlay);
  world
    .query(Input, Player, Velocity)
    .updateEach(([input, player, velocity]) => {
      const { controlsScheme } = player;

      let horizontal = 0;
      let vertical = 0;

      if (!playing && sketch.key === "x") setPlaying(true);

      const currentVelocityX = velocity.x;
      const currentVelocityY = velocity.y;

      if (
        controlsScheme === "qrL" &&
        (current - lastQRReadTimeL >= DEBOUNCE || lastQRReadL !== qrInputs.qrL)
      ) {
        if (qrInputs.qrL === "LEFT") {
          horizontal = -currentVelocityY;
          vertical = currentVelocityX;
          lastQRReadTimeL = current;
          lastQRReadL = qrInputs.qrL;
        } else if (qrInputs.qrL === "RIGHT") {
          horizontal = currentVelocityY;
          vertical = -currentVelocityX;
          lastQRReadTimeL = current;
          lastQRReadL = qrInputs.qrL;
        }
        qrInputs.qrL = null;
      } else if (
        controlsScheme === "qrR" &&
        (current - lastQRReadTimeR >= DEBOUNCE || lastQRReadR !== qrInputs.qrR)
      ) {
        if (qrInputs.qrR === "LEFT") {
          horizontal = -currentVelocityY;
          vertical = currentVelocityX;
          lastQRReadTimeR = current;
          lastQRReadR = qrInputs.qrR;
        } else if (qrInputs.qrR === "RIGHT") {
          horizontal = currentVelocityY;
          vertical = -currentVelocityX;
          lastQRReadTimeR = current;
          lastQRReadR = qrInputs.qrR;
        }
        qrInputs.qrR = null;
      }

      // Normalize the vector if moving diagonally.

      const length = Math.sqrt(horizontal * horizontal + vertical * vertical);

      if (length > 0) {
        input.x = horizontal / (length || 1);

        input.y = vertical / (length || 1);
      }
    });
}
