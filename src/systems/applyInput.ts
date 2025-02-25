import { World } from "koota";
import {
  Input,
  Movement,
  Player,
  Position,
  Velocity,
  prevVelocity,
} from "../traits";
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
  const { x, y } = input;
  if (x === 0 && y === 0) {
    return direction;
  }

  const inputDirection =
    x === -1
      ? Direction.Left
      : x === 1
      ? Direction.Right
      : y === -1
      ? Direction.Up
      : y === 1
      ? Direction.Down
      : direction;

  return inputDirection !== oppositeDirectionMap[direction]
    ? inputDirection
    : direction;
}

export function applyInput(world: World) {
  // Query entities with input, transform, and movement components
  const results = world.query(
    Input,
    Movement,
    Velocity,
    prevVelocity,
    Player,
    Position
  );

  results.updateEach(
    ([input, movement, velocity, prevVelocity, player, position]) => {
      const { direction, speed } = movement;
      const newDirection = getNewDirection(input, direction);

      // If the new direction is different from the current direction, add a new segment position to the beginning of the segments array
      if (newDirection !== direction) {
        player.segments.unshift({ x: position.x, y: position.y });
        movement.direction = newDirection;
      }
      prevVelocity.x = velocity.x;
      prevVelocity.y = velocity.y;
      // movement.direction = getNewDirection(input, direction);

      const { x, y } = velocityMap[direction];
      velocity.x = x * speed * 10;
      velocity.y = y * speed * 10;
    }
  );
}
