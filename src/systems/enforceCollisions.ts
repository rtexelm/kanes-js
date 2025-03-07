// if (gridPosition !== 0 && gridPosition !== id) {
//   if (gridPosition > 0) {
//     addCollision([id, gridPosition]);
//   } else {
//     // handleFoodCollision(world, length);
//   }
// } else if (gridPosition === id) {
//   console.log("Collided with self");
// }

import { World } from "koota";
import { actions } from "../actions";
import { Collisions, Length, Food } from "../traits";

export function enforceCollisions(world: World) {
  const { data } = world.get(Collisions)!;
  if (data.length) {
    if (data.length > 1 && data[0][1] === data[1][0]) {
      console.log("Tie");
    } else {
      const [id, gridPosition] = data[0];
      if (gridPosition > 0) {
        console.log("Collided with snake");
      } else {
        handleFoodCollision(world, world.get(Length)!);
      }
    }
    world.set(Collisions, { data: [] });
  }
}

function handleFoodCollision(world: World, length: { value: number }) {
  const { destroyFood } = actions(world);
  const food = world.queryFirst(Food)!;
  console.log("Collided with food");
  length.value += 5;
  destroyFood(food);
}

// TODO
// detect whether the return of the collision relation query is more than one, is it a snake for both? if so then a tie is declared
// if food collision then increase snake length
// if self collision true then other player scores
