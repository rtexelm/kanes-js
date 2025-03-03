import p5 from "p5";
import { actions } from "./actions";
// import { gameLoop } from "./game-loop";
// import { drawViewport } from "./renderer/drawViewport";
import "./style.css";
import { world } from "./world";
import { drawP5Canvas } from "./renderer/drawP5Canvas";
import { getPlayerStartingPos } from "./utils/getPlayerStartingPos";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PLAYER1_INIT_INPUT,
  PLAYER2_INIT_INPUT,
} from "./constants";

const { x: startX, y: startY } = getPlayerStartingPos(
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER1_INIT_INPUT.y
);

const { x: startX2, y: startY2 } = getPlayerStartingPos(
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER2_INIT_INPUT.y
);

// init
const { createPlayer } = actions(world);
createPlayer(startX, startY, "red", "wasd", PLAYER1_INIT_INPUT);
createPlayer(startX2, startY2, "#00ff00", "arrows", PLAYER2_INIT_INPUT);

let snakeP5 = new p5(drawP5Canvas);
