import { World } from "koota";
import { Length, Position, RoundEnd, Segments } from "../traits";

export function updateSegments(world: World) {
  if (world.has(RoundEnd)) return;
  const results = world.query(Position, Segments, Length);

  results.updateEach(([position, segments, length]) => {
    segments.positions.push({ ...position });
    if (segments.positions.length > length.value) {
      // Save the removed tail segment to update the grid value, clearing the grid coords the snake doesn't occupy
      segments.prevTail = segments.positions.shift() ?? { x: 0, y: 0 };
    }
  });
}
