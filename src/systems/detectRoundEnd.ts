import { World } from "koota";
import { Player, Dead, Velocity, Lives, RoundEnd, GameOver } from "../traits";
import { actions } from "../actions";

export function detectRoundEnd(world: World) {
  if (world.has(RoundEnd || GameOver)) return;
  const {
    setRoundEnd,
    setRoundEndColors,
    setGameOver,
    setGameOverTimer,
    setWinner,
  } = actions(world);
  const collisions: [string, string][] = [];
  const deaths = world.query(Player, Dead, Lives);
  const players = world.query(Player);

  let losses = 0;

  deaths.updateEach(([player, dead, lives], entity) => {
    if (lives.value <= 0) {
      losses += 1;
    }
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
    setRoundEnd(true);
    // Stop Movement
    players.updateEach(([player], entity) => {
      entity.remove(Velocity);
    });
    // Set gameover winner and return
    if (losses) {
      setGameOver(true);
      setGameOverTimer();
      let winner = "";

      world.query(Player, Lives).updateEach(([player, lives]) => {
        if (lives.value) {
          winner = player.name;
        }
      });

      if (winner) {
        setWinner(winner);
      }
      return;
    }
    // Set round winners
    if (collisions.length > 1) {
      console.log("Tie");
    } else {
      const name = collisions[0][0];
      const collided = collisions[0][1];
      console.log(`${name} died!`);
      if (name === collided) {
        setRoundEndColors("", `${collided}`);
      } else {
        setRoundEndColors(`${collided}`, `${name}`);
      }
    }
  }
}
