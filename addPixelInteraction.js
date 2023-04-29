import { createListener } from "./utils.js";

export function addPixelInteraction(workspace, state) {
  const listen = createListener(workspace);

  let currentColor = 0;
  let painting = false;

  listen("mousedown", ".pixel", (e) => {
    if (state.tool !== "brush") return;

    let pixelData = e.target.dataset;
    painting = true;

    if (e.button == 0) {
      currentColor = state.currentColors[0];
    } else if (e.button == 2) {
      currentColor = state.currentColors[1];
    }

    state.setColor(pixelData.row, pixelData.col, currentColor);
  });

  listen("mouseover", ".pixel", (e) => {
    if (state.tool !== "brush") return;
    if (!painting) return;

    let pixelData = e.target.dataset;

    state.setColor(pixelData.row, pixelData.col, currentColor);
  });

  listen("mouseup", "", (e) => {
    if (state.tool !== "brush") return;
    if (!painting) return;
    painting = false;
  });

  listen("mouseleave", "#workspace", (e) => {
    if (state.tool !== "brush") return;
    painting = false;
  });

  listen("contextmenu", ".pixel", (e) => {
    if (state.tool !== "brush") return;

    e.preventDefault();
  });
}
