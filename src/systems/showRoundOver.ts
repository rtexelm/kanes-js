import { World } from "koota";
import p5 from "p5";
import { Lives, Player, RoundEnd, Velocity } from "../traits";
// Add snakes following type paths
export function showRoundOver(world: World, sketch: p5) {
  world
    .query(Player, Lives, Velocity)
    .updateEach(([player, lives, velocity], entity) => {
      if (lives.value === 0) {
      }
      entity.remove(Velocity);
    });
  sketch.textAlign(sketch.CENTER, sketch.CENTER);
  sketch.fill("#00ff00");
  sketch.push();
  sketch.textFont("tetri");
  sketch.textSize(70);
  sketch.scale(1, 2.5);
  sketch.text("SERPENT QROSSING", sketch.width / 2, sketch.height / 7);
  sketch.pop();
  sketch.push();
  sketch.textFont("Born2bSportyFS");
  sketch.textSize(70);
  sketch.text(
    "QR code or x to start",
    sketch.width / 2,
    sketch.height / 2 + 100
  );
  sketch.pop();
}
