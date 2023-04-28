import { createListener } from "./utils.js";

export function addPaletteInteraction(palette, state) {
  const listen = createListener(palette);

  listen("click", ".palette-color", (e) => {
    // let pixelData = e.target.dataset;
    // state.setColor(state, pixelData.row, pixelData.col);
    state.setCurrentColor(e.target.dataset.color);
  });
}
