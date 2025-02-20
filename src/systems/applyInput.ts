import { World } from "koota";
import { Input, Movement, Velocity } from "../traits";
import { Direction } from "../traits/movement";

const velocityMap: Record<Direction, { x: number; y: number }> = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
  [Direction.Right]: { x: 1, y: 0 },
};

const oppositeDirectionMap: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};

function getNewDirection(
  input: { x: number; y: number },
  direction: Direction
) {
  if (input.x === 0 && input.y === 0) {
    return direction;
  }
  const { x, y } = input;

  // Map input directly to the direction unless it is the opposite direction
  const inputDirection =
    x === -1
      ? Direction.Left
      : x === 1
      ? Direction.Right
      : y === -1
      ? Direction.Up
      : y === 1
      ? Direction.Down
      : direction; // No change in direction if no input

  return inputDirection !== oppositeDirectionMap[direction]
    ? inputDirection
    : direction;
}

export function applyInput(world: World) {
  // Query entities with input, transform, and movement components
  const results = world.query(Input, Movement, Velocity);

  results.updateEach(([input, movement, velocity]) => {
    const { direction, speed } = movement;
    movement.direction = getNewDirection(input, direction);

    const { x, y } = velocityMap[direction];
    velocity.x = x * speed * 10;
    velocity.y = y * speed * 10;
  });
}
