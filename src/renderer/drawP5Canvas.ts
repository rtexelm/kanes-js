import p5 from "p5";
import { pollInputsP5 } from "../systems/pollInputsP5";
import { world } from "../world";
import { Grid } from "../traits/grid";
// import { syncRendererP5 } from "../systems/syncRenderer";
import { gameLoopP5 } from "../game-loop";

export const drawP5Canvas = (sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(500, 500);
    sketch.frameRate(10);
    const { size } = world.get(Grid)!;
    world.set(Grid, { square: sketch.width / size });
  };

  sketch.draw = () => {
    // TODO add game loop passing in sketch
    sketch.background(0);
    sketch.noStroke();
    gameLoopP5(sketch);
  };

  sketch.keyPressed = () => {
    pollInputsP5(world, sketch);
  };
};
