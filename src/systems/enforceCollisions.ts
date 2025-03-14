import { World } from "koota";
import { actions } from "../actions";
import { Collisions, Length, Food, Player, Lives } from "../traits";

function handleFoodCollision(world: World, length: { value: number }) {
  const { destroyFood } = actions(world);
  const food = world.queryFirst(Food)!;
  length.value += 5;
  destroyFood(food);
}

function handleTieCollision(world: World) {
  // TODO
  // Reduce both players lives by 1
  const players = world.query(Player, Lives);
  players.updateEach(([player, lives]) => {
    lives.value -= 1;
  });
}

function handlePlayerCollision(world: World, id: number) {
  const players = world.query(Player, Lives);
  players.updateEach(([player, lives], entity) => {
    if (entity.id() === id) lives.value -= 1;
  });
}

// TODO
// Reset positons to starting position after player collision

export function enforceCollisions(world: World) {
  const { data } = world.get(Collisions)!;
  if (data.length) {
    if (data.length > 1 && data[0][1] === data[1][0]) {
      console.log("Tie");
      handleTieCollision(world);
    } else {
      data.forEach(([head, collided]) => {
        if (collided > 0 && collided !== head) {
          console.log(`${head} collided with ${collided}`);
          handlePlayerCollision(world, head);
        } else if (collided === head) {
          console.log(`${head} collided with self`);
          handlePlayerCollision(world, head);
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
