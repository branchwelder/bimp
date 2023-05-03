import { createListener } from "./utils.js";

export function addPixelInteraction(workspace, state) {
  const listen = createListener(workspace);

  let painting = false;

  listen("mousedown", ".pixel", (e) => {
    let pixelData = e.target.dataset;

    let row = Number(pixelData.row);
    let col = Number(pixelData.col);
    let paletteIndex = Number(pixelData.color);

    if (state.tool === "brush") {
      painting = true;

      if (e.button == 0) {
        state.setColor(row, col);
      }
    } else if (state.tool === "flood") {
      if (e.button == 0) {
        state.flood(row, col, paletteIndex);
      }
    }
  });

  listen("mouseover", ".pixel", (e) => {
    if (state.tool !== "brush") return;
    if (!painting) return;

    let pixelData = e.target.dataset;

    state.setColor(pixelData.row, pixelData.col);
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
