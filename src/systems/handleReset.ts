import { Or, World } from "koota";
import {
  Food,
  GameOver,
  Grid,
  Input,
  Length,
  Player,
  Position,
  Reset,
  Segments,
  StartPosition,
  Velocity,
} from "../traits";
import { actions } from "../actions";
import { STARTING_SNAKE_LENGTH } from "../constants";
import { init, test_init } from "../main";

export function handleReset(world: World) {
  if (!world.has(Reset)) return;
  const {
    setPlaying,
    setRoundReset,
    setGameOver,
    resetGrid,
    destroyFood,
    destroyPlayer,
  } = actions(world);
  if (world.has(GameOver)) {
    setRoundReset(false);
    setGameOver(false);
    setPlaying(false);
    world.query(Player).forEach((entity) => {
      destroyPlayer(entity);
    });
    destroyFood(world.queryFirst(Food)!);
    resetGrid();
    init();
    return;
  }
  setRoundReset(false);
  resetGrid();
  console.log("handleReset");
  world
    .query(Position, StartPosition, Segments, Length)
    .updateEach(([position, startPos, segments, length], entity) => {
      position.x = startPos.x;
      position.y = startPos.y;
      segments.positions = [];
      length.value = STARTING_SNAKE_LENGTH;
      entity.add(Velocity);
      entity.id() % 2 === 0
        ? entity.set(Input, { x: 0, y: -1 })
        : entity.set(Input, { x: 0, y: 1 });
    });

  destroyFood(world.queryFirst(Food)!);
}
