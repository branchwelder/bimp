import { createListener, getActive } from "./utils.js";

export function canvasEvents(canvas, state, getCurrentMoveHandler) {
  const listen = createListener(canvas);
  console.log(canvas.dataset);

  let onMove = null;

  function getCoordinates(e) {
    const { component, componentSet, componentID } = getActive(state);

    let rect = canvas.getBoundingClientRect();
    return {
      pX: Math.floor((e.clientX - rect.left) / component.scale),
      pY: Math.floor((e.clientY - rect.top) / component.scale),
      cX: e.clientX,
      cY: e.clientY,
    };
  }

  listen("pointerdown", "", (downevent) => {
    // if it is not a left click, return
    if (downevent.button != 0) return;

    // do the down handler. this calls the function of the current tool,
    // which may return a move handler
    const moveHandler = getCurrentMoveHandler(getCoordinates(downevent));

    // if there is no move handler, we don't need to do anything else, return
    if (!moveHandler) return;

    // make a function that calls the move handler and save it
    onMove = (moveEvent) => {
      // Call the move handler with the current coordinates
      moveHandler(getCoordinates(moveEvent));
    };
  });

  listen("pointermove", "", (e) => {
    if (e.buttons == 0) {
      // If no mouse button is pressed
      onMove = null;
      return;
    }

    // Call the current move handler
    if (onMove) onMove(e);
  });
}
