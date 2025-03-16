import p5 from "p5";
import { pollInputsP5 } from "../systems";
import { world } from "../world";
import { gameLoopP5 } from "../game-loop";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

export const currentCanvasDimensions = {
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
};

export const drawP5Canvas = (sketch: p5) => {
  const baseWidth = CANVAS_WIDTH;
  const baseHeight = CANVAS_HEIGHT;
  const aspectRatio = baseWidth / baseHeight;
  let scaleFactor = 1;
  sketch.preload = () => {
    sketch.loadFont("/fonts/tetricide-brk/tetri.ttf");
    sketch.loadFont("/fonts/born2bsporty-fs/Born2bSportyFS.otf");
  };
  sketch.setup = () => {
    const { canvasWidth, canvasHeight } = updateCanvasDimensions();
    currentCanvasDimensions.width = canvasWidth;
    currentCanvasDimensions.height = canvasHeight;
    sketch.createCanvas(canvasWidth, canvasHeight);
    scaleFactor = baseWidth / canvasWidth;

    // sketch.pixelDensity(window.devicePixelRatio);
    // sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    sketch.frameRate(29);
    sketch.noStroke();
  };

  sketch.draw = () => {
    sketch.background(0);
    gameLoopP5(sketch);
  };

  sketch.windowResized = () => {
    sketch.setup();
  };

  const updateCanvasDimensions = () => {
    if (sketch.windowWidth / sketch.windowHeight > aspectRatio) {
      return {
        canvasWidth: sketch.windowHeight * aspectRatio,
        canvasHeight: sketch.windowHeight,
      };
    }

    return {
      canvasWidth: sketch.windowWidth,
      canvasHeight: sketch.windowWidth / aspectRatio,
    };
  };

  sketch.keyPressed = () => {
    pollInputsP5(world, sketch);
  };
};
