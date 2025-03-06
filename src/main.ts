import p5 from "p5";
import { actions } from "./actions";
// import { gameLoop } from "./game-loop";
// import { drawViewport } from "./renderer/drawViewport";
import "./style.css";
import { world } from "./world";
import { drawP5Canvas } from "./renderer/drawP5Canvas";
import { getPlayerStartingPos } from "./utils/getPlayerStartingPos";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  PLAYER1_INIT_INPUT,
  PLAYER2_INIT_INPUT,
} from "./constants";

// Player starting positions
// Player 1
const { x: startX, y: startY } = getPlayerStartingPos(
  GRID_WIDTH,
  GRID_HEIGHT,
  PLAYER1_INIT_INPUT.y
);

// Player 2
const { x: startX2, y: startY2 } = getPlayerStartingPos(
  GRID_WIDTH,
  GRID_HEIGHT,
  PLAYER2_INIT_INPUT.y
);

// init
const { createPlayer, setWrap } = actions(world);
setWrap();
createPlayer(startX, startY, "red", "wasd", PLAYER1_INIT_INPUT);
createPlayer(startX2, startY2, "#00ff00", "arrows", PLAYER2_INIT_INPUT);

// Defining a varibale to contain the p5 instance will expose the sytem functions to the window allowing for the canvas to be drawn because the p5 library is global, detecting the system functions
let snakeP5 = new p5(drawP5Canvas);
