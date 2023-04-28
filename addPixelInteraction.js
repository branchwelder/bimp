import { createListener } from "./utils.js";

export function addPixelInteraction(workspace, state) {
  const listen = createListener(workspace);

  let painting = false;

  listen("click", ".pixel", (e) => {
    let pixelData = e.target.dataset;
    state.setPixelColor(pixelData.row, pixelData.col);
  });

  listen("mousedown", ".pixel", (e) => {
    let pixelData = e.target.dataset;
    state.setPixelColor(pixelData.row, pixelData.col);
  });
}
