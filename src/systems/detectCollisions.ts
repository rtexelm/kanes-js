import { World } from "koota";
import { Position, Segments, Grid, Player, Length, Food } from "../traits";
import { actions } from "../actions";

export function detectCollisions(world: World) {
  const results = world.query(Player, Position, Length);
  results.updateEach(([player, position, length], entity) => {
    // const { positions } = world.get(Segments)!;
    const head = position;
    // const tail = positions.slice();
    const id = entity.id();
    const { map } = world.get(Grid)!;
    const gridPosition = map[head.y][head.x];

    if (gridPosition !== 0 && gridPosition !== id) {
      if (gridPosition > 0) {
        console.log("Collided with other snake");
      } else {
        handleFoodCollision(world, length);
      }
    } else if (gridPosition === id) {
      console.log("Collided with self");
    }
  });
}

function handleFoodCollision(world: World, length: { value: number }) {
  const { destroyFood } = actions(world);
  const food = world.queryFirst(Food)!;
  console.log("Collided with food");
  length.value += 5;
  destroyFood(food);
}
