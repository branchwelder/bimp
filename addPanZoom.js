import { createListener } from "./utils.js";

export function addPanZoom(el, state) {
  const listen = createListener(el);

  let mousedown = false;

  let scale = 1;
  let pointX = 0;
  let pointY = 0;
  let start = { x: 0, y: 0 };

  function setTransform(el) {
    el.style.transform = `translate(${Math.round(pointX)}px, ${Math.round(
      pointY
    )}px) scale(${scale.toFixed(2)})`;
  }

  function updateTransformGroups() {
    const transformGroups = document.querySelectorAll(".transform-group");
    for (const group of transformGroups) {
      setTransform(group);
    }
  }

  function toWorkspaceCoords({ x, y }) {
    let newX = (x - pointX) / scale;
    let newY = (y - pointY) / scale;

    return { x: newX, y: newY };
  }

  listen("pointerdown", "", (e) => {
    if (state.tool !== "move") return;
    if (e.shiftKey || e.button === 2) {
      return;
    }

    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const offX = e.pageX - currentTargetRect.left,
      offY = e.pageY - currentTargetRect.top;

    mousedown = true;

    start = { x: offX - pointX, y: offY - pointY };

    if (e.detail === 2) {
    }
  });

  listen("pointermove", "", (e) => {
    if (!mousedown) return;

    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const offX = e.pageX - currentTargetRect.left,
      offY = e.pageY - currentTargetRect.top;

    pointX = offX - start.x;
    pointY = offY - start.y;

    updateTransformGroups();
  });

  listen("pointerup", "", (evt) => {
    mousedown = false;
  });

  listen("mouseleave", "#workspace", (e) => {
    mousedown = false;
  });

  listen(
    "wheel",
    "",
    (e) => {
      let xs = (e.offsetX - pointX) / scale;
      let ys = (e.offsetY - pointY) / scale;

      if (Math.sign(e.deltaY) < 0) scale *= 1.03;
      else scale /= 1.03;
      // scale = parseFloat(scale.toFixed(2));

      pointX = e.offsetX - xs * scale;
      pointY = e.offsetY - ys * scale;

      updateTransformGroups();
      e.preventDefault();
    },
    { passive: false }
  );

  function setPanZoom(pz) {
    scale = pz.scale;
    pointX = pz.x;
    pointY = pz.y;
    updateTransformGroups();
  }

  function setScaleXY(limits) {
    const bb = el.getBoundingClientRect();
    const xr = limits.x[1] - limits.x[0];
    const yr = limits.y[1] - limits.y[0];
    const xScalingFactor = bb.width / xr;
    const yScalingFactor = bb.height / yr;

    const scalingFactor = Math.min(xScalingFactor, yScalingFactor) * 0.95;

    scale = scalingFactor;

    const center = {
      x: ((limits.x[0] + limits.x[1]) / 2) * scalingFactor - bb.width / 2,
      y: ((limits.y[0] + limits.y[1]) / 2) * scalingFactor - bb.height / 2,
    };

    pointX = -center.x;
    pointY = -center.y;

    updateTransformGroups();
  }

  return {
    scale: () => scale,
    x: () => pointX,
    y: () => pointY,
    setScaleXY,
    toWorkspaceCoords,
    setPanZoom,
  };
}
