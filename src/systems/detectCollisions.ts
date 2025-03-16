import { World } from "koota";
import {
  Position,
  Grid,
  Player,
  Lives,
  Dead,
  Food,
  Length,
  RoundEnd,
} from "../traits";
import { actions } from "../actions";

export function detectCollisions(world: World) {
  if (world.has(RoundEnd)) return;
  const results = world.query(Player, Position, Lives, Length);
  results.updateEach(([player, position, lives, length], entity) => {
    const { x: headX, y: headY } = position;
    // const id = entity.id();
    const { map } = world.get(Grid)!;
    const gridPosition = map[headY][headX];

    if (gridPosition > 0) {
      // Collided with player
      lives.value -= 1;
      entity.add(Dead);
      entity.set(Dead, { collided: gridPosition });
    } else if (gridPosition === -1) {
      // Collided with food
      const { destroyFood } = actions(world);
      const food = world.queryFirst(Food)!;
      length.value += 10;
      destroyFood(food);
    }
  });
}
