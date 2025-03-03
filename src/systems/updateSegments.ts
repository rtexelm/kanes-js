import { World } from "koota";
import { Length, Position, Segments } from "../traits";

export function updateSegments(world: World) {
  const results = world.query(Position, Segments, Length);

  results.updateEach(([position, segments, length]) => {
    segments.positions.push({ ...position });
    if (segments.positions.length > length.value) {
      segments.positions.shift();
    }
  });
}
