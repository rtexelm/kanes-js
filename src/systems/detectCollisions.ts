import { World } from "koota";
import { Position, Grid, Player } from "../traits";
import { actions } from "../actions";

export function detectCollisions(world: World) {
  const { addCollision } = actions(world);
  const results = world.query(Player, Position);
  results.updateEach(([player, position], entity) => {
    const { x: headX, y: headY } = position;
    const id = entity.id();
    const { map } = world.get(Grid)!;
    const gridPosition = map[headY][headX];

    if (gridPosition !== 0) addCollision([id, gridPosition]);
  });
}
