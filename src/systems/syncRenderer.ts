import { World } from "koota";
import {
  Position,
  Ref,
  Player,
  Segments,
  Grid,
  Food,
  Lives,
  RoundEnd,
} from "../traits";
import p5 from "p5";

function drawText(
  x: number,
  y: number,
  text_array: string | any[],
  sketch: p5
) {
  const aligns = [sketch.RIGHT, sketch.CENTER, sketch.LEFT];
  const yStep = 85;
  let posY = y;
  for (let i = 0; i < text_array.length; ++i) {
    let part = text_array[i];
    let t = part[0];
    let c = part[1];
    sketch.textAlign(aligns[i]);
    sketch.fill(c);
    sketch.text(t, x, posY);
    posY += yStep;
  }
}

export function syncRenderer(world: World) {
  world.query(Ref, Position).updateEach(([ref, position]) => {
    ref.value.style.transform = `translate(${position.x}px, ${position.y}px)`;
  });
}

export function syncRendererP5(world: World, sketch: p5) {
  const { cell } = world.get(Grid)!;
  world
    .query(Player, Position, Segments, Lives)
    .updateEach(([player, position, segments, lives], entity) => {
      const { color } = player;
      let c = sketch.color(color);
      // Create an array of the whole snake coordinates
      const snakeCoordinates = [position, ...segments.positions];

      sketch.fill(c);
      // Loop through the snake coordinates and draw each segment multiplying the x and y coordinates by the cell dimensions
      for (const segment of snakeCoordinates) {
        sketch.rect(
          segment.x * cell.width,
          segment.y * cell.height,
          cell.width,
          cell.height
        );
      }
      // Draw lives in respective corners
      sketch.push();
      c.setAlpha(130);
      sketch.fill(c);
      let drawLocale = {
        x: entity.id() % 2 !== 0 ? 11.75 : sketch.width - 11.75,
        y: sketch.height - 8,
      };
      sketch.textFont("Born2bSportyFS");
      sketch.textSize(20);
      sketch.text(`${lives.value}`, drawLocale.x, drawLocale.y);
      sketch.pop();
    });
  // Draw food
  world.query(Food, Position).updateEach(([food, position]) => {
    const { color } = food;
    sketch.fill(color);
    sketch.rect(
      position.x * cell.width,
      position.y * cell.height,
      cell.width,
      cell.height
    );
  });
  // Draw round end text
  if (world.has(RoundEnd)) {
    // Get variables
    const { messageColors } = world.get(RoundEnd)!;
    const { winnerColor, loserColor } = messageColors;
    const colorMap: { [key: string]: string } = {
      Red: "red",
      Green: "#00ff00",
    };
    // Draw text
    sketch.push();
    sketch.textFont("tetri");
    sketch.textSize(80);
    if (loserColor && !winnerColor) {
      // sketch.textAlign(sketch.RIGHT, sketch.CENTER);
      let textArray = [
        [loserColor.toUpperCase(), colorMap[loserColor]],
        ["KILLED", "gold"],
        ["ITSELF!", "gold"],
      ];
      drawText(sketch.width / 2, sketch.height / 3, textArray, sketch);
    } else if (!winnerColor && !loserColor) {
      let textArray = [
        ["ITS", colorMap["Green"]],
        ["A", "gold"],
        ["TIE!", colorMap["Red"]],
      ];
      drawText(sketch.width / 2, sketch.height / 3, textArray, sketch);
    } else {
      let textArray = [
        [loserColor.toUpperCase(), colorMap[loserColor]],
        ["HIT", "gold"],
        [`${winnerColor.toUpperCase()}!`, colorMap[winnerColor]],
      ];
      drawText(sketch.width / 2, sketch.height / 3, textArray, sketch);
    }
    sketch.pop();
  }
}
