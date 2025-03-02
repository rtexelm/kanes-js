import { World } from "koota";
import { Input, Movement, Velocity } from "../traits";

export function applyInput(world: World) {
  // Query entities with input, transform, and movement components
  const results = world.query(Input, Movement, Velocity);

  results.updateEach(([input, movement, velocity]) => {
    const { speed } = movement;

    const isReversingDirection = (axisInput: number, axisVelocity: number) =>
      axisInput !== 0 && Math.sign(axisInput) !== Math.sign(axisVelocity);

    // if (
    //   isReversingDirection(input.x, velocity.x) ||
    //   isReversingDirection(input.y, velocity.y)
    // ) {
    //   return;
    // }
    velocity.x = input.x * speed * 10;
    velocity.y = input.y * speed * 10;

    console.log(`Updated velocity to: ${velocity.x}, ${velocity.y}`);
  });
}
