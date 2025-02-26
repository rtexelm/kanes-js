import { createActions, Entity } from "koota";
import { Input, Movement, Player, Position, Velocity, Food } from "./traits";
import { drawPlayerView } from "./renderer/drawPlayer";
import { erasePlayerView } from "./renderer/erasePlayer";

export const actions = createActions((world) => ({
  createPlayer: (
    x: number,
    y: number,
    color: string,
    controlsScheme: string
  ) => {
    const player = world.spawn(
      Position({ x, y }),
      Velocity,
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
