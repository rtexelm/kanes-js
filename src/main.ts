import p5 from "p5";
import { actions } from "./actions";
// import { gameLoop } from "./game-loop";
// import { drawViewport } from "./renderer/drawViewport";
import "./style.css";
import { world } from "./world";
import { drawP5Canvas } from "./renderer/drawP5Canvas";

// init
const { createPlayer } = actions(world);
createPlayer(400, 300, "red", "wasd", { x: 0, y: 1 });
createPlayer(300, 300, "blue", "arrows", { x: 0, y: -1 });

let snakeP5 = new p5(drawP5Canvas);
