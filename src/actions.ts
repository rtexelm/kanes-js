import { createActions, Entity } from "koota";
import { Input, Movement, Player, Position, Velocity } from "./traits";
import { drawPlayerView } from "./renderer/drawPlayer";
import { erasePlayerView } from "./renderer/erasePlayer";
import { Direction } from "./traits/movement";

export const actions = createActions((world) => ({
  createPlayer: (x: number, y: number) => {
    const player = world.spawn(
      Position({ x, y }),
      Velocity,
      Player,
      Input,
      Movement({ speed: 20, direction: Direction.Down })
    );
    drawPlayerView(player);
    return player;
  },
  destroyPlayer: (player: Entity) => {
    erasePlayerView(player);
    player.destroy();
  },
}));
