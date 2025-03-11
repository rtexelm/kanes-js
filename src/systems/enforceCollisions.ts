import { World } from "koota";
import { actions } from "../actions";
import { Collisions, Length, Food, Player } from "../traits";

function handleFoodCollision(world: World, length: { value: number }) {
  const { destroyFood } = actions(world);
  const food = world.queryFirst(Food)!;
  length.value += 5;
  destroyFood(food);
}

function handleTieCollision(world: World) {
  // TODO
}

function handleSelfCollision(world: World) {
  // TODO
}

function handlePlayerCollision(world: World) {
  // TODO
}

export function enforceCollisions(world: World) {
  const { data } = world.get(Collisions)!;
  if (data.length) {
    if (data.length > 1 && data[0][1] === data[1][0]) {
      console.log("Tie");
    } else {
      data.forEach(([head, collided]) => {
        if (collided > 0 && collided !== head) {
          console.log(`${head} collided with ${collided}`);
        } else if (collided === head) {
          console.log(`${head} collided with self`);
        } else {
          const players = world.query(Player, Length);
          players.updateEach(([player, length], entity) => {
            if (entity.id() === head) {
              handleFoodCollision(world, length);
            }
          });
          console.log(`${head} collided with food`);
        }
      });
    }
    world.set(Collisions, { data: [] });
  }
}
