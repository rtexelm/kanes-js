import p5 from "p5";
import { pollInputsP5 } from "../systems/pollInputsP5";
import { world } from "../world";
import { gameLoopP5 } from "../game-loop";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

export const drawP5Canvas = (sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    sketch.frameRate(15);
    sketch.noStroke();
  };

  sketch.draw = () => {
    sketch.background(0);
    gameLoopP5(sketch);
  };

  sketch.keyPressed = () => {
    pollInputsP5(world, sketch);
  };
};
