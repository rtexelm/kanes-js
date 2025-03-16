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
export function init() {
  const { createPlayer, setWrap } = actions(world);
  setWrap();
  createPlayer(startX, startY, "red", "Red", "qrR", PLAYER1_INIT_INPUT);
  createPlayer(startX2, startY2, "#00ff00", "Green", "qrL", PLAYER2_INIT_INPUT);
}
// test init
// TODO return this to init if prsenting
export function test_init() {
  const { createPlayer, setWrap } = actions(world);
  setWrap();
  createPlayer(startX, startY, "red", "Red", "wasd", { x: 1, y: 0 });
  createPlayer(startX2, startY2, "#00ff00", "Green", "arrows", { x: -1, y: 0 });
}

init();

// Defining a varibale to contain the p5 instance will expose the sytem functions to the window allowing for the canvas to be drawn because the p5 library is global, detecting the system functions
// @ts-ignore
let snakeP5 = new p5(drawP5Canvas, "game");
