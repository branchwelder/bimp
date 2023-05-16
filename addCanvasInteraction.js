import { createListener } from "./utils.js";

export function addCanvasInteraction(canvas, state, dispatch) {
  const listen = createListener(canvas);

  let mousedown = false;
  let pos = { x: 0, y: 0 };

  function getPixelCoordinates(e) {
    const active = state.layers[state.activeLayer];

    let rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(
        (e.clientX - rect.left) /
          state.panZoom.scale() /
          active.palette.scale[0]
      ),
      y: Math.floor(
        (e.clientY - rect.top) / state.panZoom.scale() / active.palette.scale[1]
      ),
    };
  }

  function begin() {
    mousedown = true;
  }

  function end() {
    mousedown = false;
  }

  listen("pointerdown", "", (e) => {
    if (
      state.activeTool === "move" ||
      state.layers[state.activeLayer].type === "code"
    )
      return;
    begin();
    pos = getPixelCoordinates(e);
    dispatch("applyTool", pos);
  });

  listen("pointermove", "", (e) => {
    if (!mousedown) return;
    let newPos = getPixelCoordinates(e);

    if (newPos.x == pos.x && newPos.y == pos.y) return; // return if still inside pixel
    pos = newPos;
    if (pos.x < 0 || pos.y < 0) return; // return if out of bounds

    dispatch("applyTool", pos);
  });

  listen("pointerleave", "", (e) => {
    if (mousedown) end();
  });

  listen("pointerup", "", (e) => {
    if (mousedown) end();
  });
}
