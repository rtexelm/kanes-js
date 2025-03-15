import { World } from "koota";
import { Player, Dead, Velocity, Segments } from "../traits";
import { actions } from "../actions";

export function detectRoundEnd(world: World) {
  const { setRoundEnd, setRoundEndColors } = actions(world);
  const collisions: [string, string][] = [];
  const deaths = world.query(Player, Dead);
  const players = world.query(Player);

  deaths.updateEach(([player, dead], entity) => {
    const { name } = player;
    let collided = "";
    players.updateEach(([player], entity) => {
      if (entity.id() === dead.collided) {
        collided = player.name;
      }
    });
    collisions.push([name, collided]);
    entity.remove(Dead);
  });

  if (collisions.length) {
    // Stop Movement
    setRoundEnd(true);
    players.updateEach(([player], entity) => {
      entity.remove(Velocity);
    });
    if (collisions.length > 1) {
      console.log("Tie");
    } else {
      const name = collisions[0][0];
      const collided = collisions[0][1];
      console.log(`${name} died!`);
      if (name === collided) {
        setRoundEndColors("", `${name}`);
      } else {
        setRoundEndColors(`${name}`, `${collided}`);
      }
    }
  }
}
