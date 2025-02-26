// Import Koota or any lightweight ECS library
import { World, System, Component } from "koota";

// Components
class Position extends Component {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

class Direction extends Component {
  constructor(xDir, yDir) {
    super();
    this.xDir = xDir;
    this.yDir = yDir;
  }
}

class SnakeLength extends Component {
  constructor(length) {
    super();
    this.length = length;
  }
}

class IsSnake extends Component {}
class IsFood extends Component {}

// Systems
class MovementSystem extends System {
  update(world) {
    world.entities.forEach((entity) => {
      const position = entity.getComponent(Position);
      const direction = entity.getComponent(Direction);
      if (position && direction) {
        position.x += direction.xDir;
        position.y += direction.yDir;

        // Handle wrapping logic
        if (position.x < 0) position.x = world.gridSize - 1;
        else if (position.x >= world.gridSize) position.x = 0;
        if (position.y < 0) position.y = world.gridSize - 1;
        else if (position.y >= world.gridSize) position.y = 0;
      }
    });
  }
}

class RenderSystem extends System {
  update(world) {
    background(75);
    world.entities.forEach((entity) => {
      const position = entity.getComponent(Position);
      const snake = entity.getComponent(IsSnake);
      const food = entity.getComponent(IsFood);
      if (position) {
        if (snake) {
          fill(0, 0, 255);
        } else if (food) {
          fill(255);
        }
        rect(
          position.x * world.squareSize,
          position.y * world.squareSize,
          world.squareSize,
          world.squareSize
        );
      }
    });
  }
}

class CollisionSystem extends System {
  update(world) {
    // Handle snake collisions with itself or food
    const snakes = world.entities.filter((e) => e.hasComponent(IsSnake));
    const food = world.entities.find((e) => e.hasComponent(IsFood));

    snakes.forEach((snake) => {
      const position = snake.getComponent(Position);
      const snakeLength = snake.getComponent(SnakeLength);

      // Check if snake eats the food
      if (
        position.x === food.getComponent(Position).x &&
        position.y === food.getComponent(Position).y
      ) {
        snakeLength.length += 5; // Increase snake length
        world.respawnFood();
      }

      // TODO: Add logic for snake collision with itself or other snakes
      // Check if snake collides with itself
      // for (let i = 0; i < snakes.length; i++) {
      //   if (i !== snakeIndex) {
      //     const otherSnake = snakes[i];
      //     const otherSnakePosition = otherSnake.getComponent(Position);
      //     if (
      //       position.x === otherSnakePosition.x &&
      //       position.y === otherSnakePosition.y
      //     ) {
      //       // Handle collision logic here
      //     }
      //   }
      // }

      // TODO: Add logic for snake collision with other snakes
      // for (let i = 0; i < snakes.length; i++) {
      //   if (i !== snakeIndex) {
      //     const otherSnake = snakes[i];
      //     const otherSnakePosition = otherSnake.getComponent(Position);
      //     if (
      //       position.x === otherSnakePosition.x &&
      //       position.y === otherSnakePosition.y
      //     ) {
      //       // Handle collision logic here
      //     }
      //   }
      // }
    });
  }
}

// Initialize the world and grid
let world = new World();
world.gridSize = 50; // 50x50 grid
world.squareSize = width / world.gridSize;

// Initialize entities
let snake1 = world.createEntity();
snake1.addComponent(new Position(0, Math.floor(world.gridSize / 2)));
snake1.addComponent(new Direction(1, 0)); // Moving east initially
snake1.addComponent(new SnakeLength(11));
snake1.addComponent(new IsSnake());

let snake2 = world.createEntity();
snake2.addComponent(
  new Position(world.gridSize - 1, Math.floor(world.gridSize / 2))
);
snake2.addComponent(new Direction(-1, 0)); // Moving west initially
snake2.addComponent(new SnakeLength(11));
snake2.addComponent(new IsSnake());

let food = world.createEntity();
food.addComponent(
  new Position(
    Math.floor(Math.random() * world.gridSize),
    Math.floor(Math.random() * world.gridSize)
  )
);
food.addComponent(new IsFood());

// Add systems to the world
world.addSystem(new MovementSystem());
world.addSystem(new RenderSystem());
world.addSystem(new CollisionSystem());

// Main game loop
function setup() {
  createCanvas(500, 500);
  frameRate(10); // Slow down the game for easier control
}

function draw() {
  world.update(); // Update all systems in the world
}

// Key input handling for controlling snake directions
function keyPressed() {
  if (key === "w")
    (snake1.getComponent(Direction).xDir = 0),
      (snake1.getComponent(Direction).yDir = -1);
  if (key === "a")
    (snake1.getComponent(Direction).xDir = -1),
      (snake1.getComponent(Direction).yDir = 0);
  if (key === "s")
    (snake1.getComponent(Direction).xDir = 0),
      (snake1.getComponent(Direction).yDir = 1);
  if (key === "d")
    (snake1.getComponent(Direction).xDir = 1),
      (snake1.getComponent(Direction).yDir = 0);

  if (keyCode === UP_ARROW)
    (snake2.getComponent(Direction).xDir = 0),
      (snake2.getComponent(Direction).yDir = -1);
  if (keyCode === LEFT_ARROW)
    (snake2.getComponent(Direction).xDir = -1),
      (snake2.getComponent(Direction).yDir = 0);
  if (keyCode === DOWN_ARROW)
    (snake2.getComponent(Direction).xDir = 0),
      (snake2.getComponent(Direction).yDir = 1);
  if (keyCode === RIGHT_ARROW)
    (snake2.getComponent(Direction).xDir = 1),
      (snake2.getComponent(Direction).yDir = 0);
}

// Utility function to respawn food in the world
world.respawnFood = function () {
  food.getComponent(Position).x = Math.floor(Math.random() * world.gridSize);
  food.getComponent(Position).y = Math.floor(Math.random() * world.gridSize);
};
