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
  Wrap,
  inPlay,
  Lives,
  RoundEnd,
  Reset,
  StartPosition,
  Grid,
} from "./traits";
import { drawPlayerView } from "./renderer/drawPlayerElement";
import { erasePlayerView } from "./renderer/erasePlayer";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  STARTING_SNAKE_LENGTH,
  WRAP_AROUND,
} from "./constants";
import { GameOver } from "./traits/gameover";

export const actions = createActions((world) => ({
  createPlayer: (
    x: number,
    y: number,
    color: string,
    name: string,
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
      Player({ color, name, controlsScheme }),
      Input(input),
      Movement({ speed: 20 }),
      Segments({ positions: segments }),
      Length,
      Lives,
      StartPosition({ x, y })
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
    const { x, y } = food.get(Position)!;
    const { width, height } = food.get(Food)!;
    const { map } = world.get(Grid)!;
    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        const foodPosX = x + dx;
        const foodPosY = y + dy;

        // Ensure we're within the grid bounds before setting the food position
        if (
          foodPosY >= 0 &&
          foodPosY < map.length &&
          foodPosX >= 0 &&
          foodPosX < map[0].length
        ) {
          if (map[foodPosY][foodPosX] < 0) {
            map[foodPosY][foodPosX] = 0;
          }
        }
      }
    }
    food.destroy();
  },
  setWrap: () => WRAP_AROUND && world.add(Wrap),
  setPlaying: (state) => (state ? world.add(inPlay) : world.remove(inPlay)),
  setRoundEnd: (state) =>
    state ? world.add(RoundEnd) : world.remove(RoundEnd),
  setRoundEndColors: (winC: string, loseC: string) => {
    world.set(RoundEnd, {
      messageColors: {
        winnerColor: winC,
        loserColor: loseC,
      },
    });
  },
  setRoundReset: (state) => (state ? world.add(Reset) : world.remove(Reset)),
  setGameOver: (state) =>
    state ? world.add(GameOver) : world.remove(GameOver),
  setWinner: (name: string) => {
    world.set(GameOver, {
      winner: name,
    });
  },
  setGameOverTimer: () => {
    world.set(RoundEnd, {
      timer: 50,
    });
  },
  resetGrid: () => {
    world.set(Grid, {
      map: Array(GRID_HEIGHT)
        .fill(0)
        .map(() => Array(GRID_WIDTH).fill(0)),
    });
  },
  // addCollision: (collision: [number, number]) => {
  //   const { data } = world.get(Collisions)!;
  //   data.push(collision);
  //   world.set(Collisions, { data });
  // },
}));
