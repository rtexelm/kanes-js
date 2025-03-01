import { World } from "koota";
import {
  Input,
  Movement,
  Player,
  Position,
  Velocity,
  PrevVelocity,
} from "../traits";
// import { Directions } from "../types";

// const velocityMap: Record<number, { x: number; y: number }> = {
//   [Directions.Up]: { x: 0, y: -1 },
//   [Directions.Down]: { x: 0, y: 1 },
//   [Directions.Left]: { x: -1, y: 0 },
//   [Directions.Right]: { x: 1, y: 0 },
// };

// const oppositeDirectionsMap: Record<Directions, Directions> = {
//   [Directions.Up]: Directions.Down,
//   [Directions.Down]: Directions.Up,
//   [Directions.Left]: Directions.Right,
//   [Directions.Right]: Directions.Left,
// };

// function getNewDirections(
//   input: { x: number; y: number },
//   Directions: Directions
// ) {
//   const { x, y } = input;
//   if (x === 0 && y === 0) {
//     return Directions;
//   }

//   const inputDirections =
//     x === -1
//       ? Directions.Left
//       : x === 1
//       ? Directions.Right
//       : y === -1
//       ? Directions.Up
//       : y === 1
//       ? Directions.Down
//       : Directions;

//   return inputDirections !== oppositeDirectionsMap[Directions]
//     ? inputDirections
//     : Directions;
// }

export function applyInput(world: World) {
  // Query entities with input, transform, and movement components
  const results = world.query(Input, Movement, Velocity);

  results.updateEach(([input, movement, velocity]) => {
    const { speed } = movement;

    const isReversingDirection = (axisInput: number, axisVelocity: number) =>
      axisInput !== 0 && Math.sign(axisInput) !== Math.sign(axisVelocity);

    if (
      isReversingDirection(input.x, velocity.x) ||
      isReversingDirection(input.y, velocity.y)
    ) {
      return;
    }
    velocity.x = input.x * speed * 10;
    velocity.y = input.y * speed * 10;
  });
}
