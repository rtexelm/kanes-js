import { actions } from "./actions";
import { gameLoop } from "./game-loop";
import { drawViewport } from "./renderer/drawViewport";
import "./style.css";
import { world } from "./world";

// init
gameLoop();

const { createPlayer } = actions(world);
drawViewport();
createPlayer(400, 300);

// matterJS for collision detection
