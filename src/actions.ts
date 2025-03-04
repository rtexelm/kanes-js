import { createActions, Entity } from "koota";
import {
  Input,
  Movement,
  Player,
  Position,
  Velocity,
  Food,
  Segments,
  Length,
} from "./traits";
import { drawPlayerView } from "./renderer/drawPlayerElement";
import { erasePlayerView } from "./renderer/erasePlayer";
import { STARTING_SNAKE_LENGTH } from "./constants";

export const actions = createActions((world) => ({
  createPlayer: (
    x: number,
    y: number,
    color: string,
    controlsScheme: string,
    input: { x: number; y: number }
  ) => {
    // Create the inital snake grid cells, controlled by the length constant
    const segments: { x: number; y: number }[] =
      input.x !== 0
        ? Array.from({ length: STARTING_SNAKE_LENGTH }, (_, i) => ({
            x: x,
            y,
          }))
        : Array.from({ length: STARTING_SNAKE_LENGTH }, (_, i) => ({
            x,
            y: y,
          }));

    const player = world.spawn(
      Position({ x, y }),
      Velocity,
      Player({ color, controlsScheme }),
      Input(input),
      Movement({ speed: 20 }),
      Segments({ positions: segments }),
      Length
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
