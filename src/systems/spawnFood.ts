import { World } from "koota";
import { Position, Food, Grid } from "../traits";
import { actions } from "../actions";

export function spawnFood(world: World) {
  const food = world.queryFirst(Food);
  const { createFood } = actions(world);

  if (!food) {
    const { dimensions } = world.get(Grid)!;
    const x = Math.floor(Math.random() * dimensions.x - 1);
    const y = Math.floor(Math.random() * dimensions.y - 1);
    createFood(x, y);
  }
}
