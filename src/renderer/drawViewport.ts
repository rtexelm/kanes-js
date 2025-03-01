import "./viewport.css";

export function drawViewport() {
  const body = document.querySelector("body");
  const viewport = document.createElement("div");
  viewport.classList.add("viewport");
  body?.appendChild(viewport);
}
