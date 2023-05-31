export function scale(e, state, dispatch) {
  e.preventDefault();

  let [panX, panY] = state.pan;
  let xs = (e.offsetX - panX) / state.scale;
  let ys = (e.offsetY - panY) / state.scale;

  let newPixSize;

  if (Math.sign(e.deltaY) < 0) {
    newPixSize = Math.ceil(state.scale * 1.03);
  } else {
    newPixSize = Math.floor(state.scale / 1.03);
  }

  if (newPixSize < 5) {
    dispatch({ scale: 5, pan: [panX, panY] });
  } else {
    panX = e.offsetX - xs * newPixSize;
    panY = e.offsetY - ys * newPixSize;

    dispatch({ scale: newPixSize, pan: [panX, panY] });
  }
}

export function beginPan(e, state, dispatch) {
  if (e.target.id == "overlay") return;
  const el = e.currentTarget;
  let [panX, panY] = state.pan;

  if (e.shiftKey || e.button === 2) {
    return;
  }

  let bb = el.getBoundingClientRect();

  const offX = e.pageX - bb.left,
    offY = e.pageY - bb.top;

  let mousedown = true;
  let dragStart = { x: offX - panX, y: offY - panY };

  const pan = (e) => {
    if (!mousedown) return;

    let bb = el.getBoundingClientRect();
    const offX = e.pageX - bb.left,
      offY = e.pageY - bb.top;

    panX = offX - dragStart.x;
    panY = offY - dragStart.y;

    dispatch({ pan: [panX, panY] });
  };

  const endPan = (e) => {
    mousedown = false;
    el.removeEventListener("pointermove", pan);
    el.removeEventListener("pointerup", endPan);
    el.removeEventListener("pointerleave", endPan);
  };

  el.addEventListener("pointermove", pan);
  el.addEventListener("pointerup", endPan);
  el.addEventListener("pointerleave", endPan);
}
