import p5 from "p5";
import { actions } from "./actions";
// import { gameLoop } from "./game-loop";
// import { drawViewport } from "./renderer/drawViewport";
import "./style.css";
import { world } from "./world";
import { drawP5Canvas } from "./renderer/drawP5Canvas";

// init
// gameLoop();

const { createPlayer } = actions(world);
// drawViewport();
createPlayer(400, 300, "red", "wasd");

// function setup() {
//   createCanvas(500, 500);
//   frameRate(10);
// }

// function draw() {
//   gameLoop();
// }

let snakeP5 = new p5(drawP5Canvas);
