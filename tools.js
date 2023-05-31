function getActiveBitmap(state) {
  return state.layers[state.activeLayer].bitmap;
}

export function brush(pos, editorState, dispatch) {
  let currentPos = pos;

  function brushPixel(newPos, editorState) {
    if (newPos.pX == currentPos.pX && newPos.pY == currentPos.pY) return;
    const updated = editorState.bitmap.line(
      { x: currentPos.pX, y: currentPos.pY },
      { x: newPos.pX, y: newPos.pY },
      editorState.color
    );

    currentPos = newPos;

    dispatch("udpateEditorState", {
      bitmap: updated,
    });
  }

  brushPixel(pos, editorState);
  return brushPixel;
}

export function flood(pos, state, dispatch) {
  let currentPos = pos;

  function floodArea(newPos, state) {
    if (newPos.pX == currentPos.pX && newPos.pY == currentPos.pY) return;
    currentPos = newPos;

    dispatch("updateActiveBitmap", {
      bitmap: getActiveBitmap(state).flood(
        { x: currentPos.pX, y: currentPos.pY },
        state.color
      ),
    });
  }

  floodArea(pos, state);
  return floodArea;
}

export function rect(start, state, dispatch) {
  // When we start to draw a rectangle, we save the currently active bitmap
  // so our changes will only be completely overriden when we stop dragging
  const bimp = getActiveBitmap(state);
  let currentPos = start;

  function drawRectangle(newPos) {
    if (newPos.pX == currentPos.pX && newPos.pY == currentPos.pY) return;
    currentPos = newPos;

    dispatch("updateActiveBitmap", {
      bitmap: bimp.rect(
        { x: start.pX, y: start.pY },
        { x: currentPos.pX, y: currentPos.pY },
        state.color
      ),
    });
  }
  drawRectangle(start);
  return drawRectangle;
}

export function line(start, state, dispatch) {
  const bimp = getActiveBitmap(state);
  let currentPos = start;

  function drawLine(newPos) {
    if (newPos.pX == currentPos.pX && newPos.pY == currentPos.pY) return;
    currentPos = newPos;

    dispatch("updateActiveBitmap", {
      bitmap: bimp.line(
        { x: start.pX, y: start.pY },
        { x: currentPos.pX, y: currentPos.pY },
        state.color
      ),
    });
  }
  drawLine(start);
  return drawLine;
}

export function pan(pos, state, dispatch) {
  function doPan(coords, state) {
    console.log(coords);
    // here we will want to dispatch "update pan" or something
  }

  doPan(pos);
  return doPan;
}

// export function line(start, state, dispatch) {
//   function drawRectangle(pos) {
//     dispatch({
//       bitmap: state.bitmap.rect(start, pos, state.currentPaletteIndex),
//     });
//   }
//   drawRectangle(start);
//   return drawRectangle;
// }

// export function pick(pos, state, dispatch) {
//   dispatch({ currentPaletteIndex: state.bitmap.pixel(pos.x, pos.y) });
// }
