import { createActions, Entity } from "koota";
import { Input, Movement, Player, Position, Velocity } from "./traits";
import { drawPlayerView } from "./renderer/drawPlayer";
import { erasePlayerView } from "./renderer/erasePlayer";
import { Direction } from "./traits/movement";
import { SNAKE_WIDTH } from "./constants";
import { prevVelocity } from "./traits/prevVelocity";

export const actions = createActions((world) => ({
  createPlayer: (x: number, y: number) => {
    const tail = { x, y: 2 * SNAKE_WIDTH + y };
    const player = world.spawn(
      Position({ x, y }),
      Velocity,
      prevVelocity,
      Player({ segments: [tail], tail: tail }),
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
