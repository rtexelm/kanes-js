import "./viewport.css";

export function drawViewport() {
  const body = document.querySelector("body");
  const viewport = document.createElement("div");
  viewport.classList.add("viewport");
  body?.appendChild(viewport);
}

// draw the game in a p5 canvas
export function drawViewportP5() {
  const setup = () => {
    createCanvas(800, 600);
  };
}
