import { createListener } from "./utils.js";

export function addCanvasInteraction(canvas, state, dispatch) {
  const listen = createListener(canvas);

  let mousedown = false;
  let pos = { x: 0, y: 0 };

  function getPixelCoordinates(e) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(
        (e.clientX - rect.left) / state.pixelScale / state.panZoom.scale()
      ),
      y: Math.floor(
        (e.clientY - rect.top) / state.pixelScale / state.panZoom.scale()
      ),
    };
  }

  function begin() {
    dispatch("snapshot");
    mousedown = true;
  }

  function end() {
    mousedown = false;
  }

  listen("pointerdown", "", (e) => {
    if (state.activeTool === "move") return;
    begin();
    pos = getPixelCoordinates(e);
    dispatch("applyTool", pos);
  });

  listen("pointermove", "", (e) => {
    if (!mousedown) return;
    let newPos = getPixelCoordinates(e);

    if (newPos.x == pos.x && newPos.y == pos.y) return; // return if still inside pixel
    pos = newPos;

    dispatch("applyTool", pos);
  });

  listen("pointerleave", "", (e) => {
    if (mousedown) end();
  });

  listen("pointerup", "", (e) => {
    if (mousedown) end();
  });
}
