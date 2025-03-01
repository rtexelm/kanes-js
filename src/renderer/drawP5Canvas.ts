import p5 from "p5";
import { pollInputsP5 } from "../systems/pollInputsP5";
import { world } from "../world";

let x = 100;
let y = 100;

export const drawP5Canvas = (sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(500, 500);
    sketch.frameRate(10);
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x, y, 50, 50);
  };

  sketch.keyPressed = () => {
    pollInputsP5(world, sketch);
  };
};
