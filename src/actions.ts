import { createActions, Entity } from "koota";
import {
  Input,
  Movement,
  Player,
  Position,
  Velocity,
  Direction,
  Food,
} from "./traits";
import { drawPlayerView } from "./renderer/drawPlayerElement";
import { erasePlayerView } from "./renderer/erasePlayer";
import { Directions } from "./types";

export const actions = createActions((world) => ({
  createPlayer: (
    x: number,
    y: number,
    color: string,
    controlsScheme: string,
    direction: Directions
  ) => {
    const player = world.spawn(
      Position({ x, y }),
      Velocity,
      Direction,
      Player({ color, controlsScheme }),
      Input,
      Movement({ speed: 20 })
    );
    drawPlayerView(player);
    return player;
  },
  destroyPlayer: (player: Entity) => {
    erasePlayerView(player);
    player.destroy();
  },
  createFood: (x: number, y: number) => {
    const food = world.spawn(Position({ x, y }), Food);
    return food;
  },
  destroyFood: (food: Entity) => {
    food.destroy();
    // TODO: Add logic to remove food from the renderer
  },
}));
