const trigger = (e) => e.composedPath()[0];
const matchesTrigger = (e, selectorString) =>
  trigger(e).matches(selectorString);

export const createListener =
  (target) => (eventName, selectorString, event, args) => {
    target.addEventListener(
      eventName,
      (e) => {
        e.trigger = trigger(e);
        if (selectorString === "" || matchesTrigger(e, selectorString))
          event(e);
      },
      args ?? {}
    );
  };

function pixelRGBA(state, x, y) {
  const pixel = state.palette[state.bitmap.pixel(x, y)];
  return `rgb(${pixel.r * 255} ${pixel.g * 255} ${pixel.b * 255} / ${pixel.a})`;
}

function drawPixel({ x, y }, canvas, scale, color) {
  let cx = canvas.getContext("2d");

  cx.fillStyle = color;
  cx.fillRect(x * scale, y * scale, scale, scale);
}

export function drawPicture(state) {
  state.canvas.width = state.bitmap.width * state.pixelScale;
  state.canvas.height = state.bitmap.height * state.pixelScale;

  for (let y = 0; y < state.bitmap.height; y++) {
    for (let x = 0; x < state.bitmap.width; x++) {
      const cssColor = pixelRGBA(state, x, y);
      drawPixel({ x, y }, state.canvas, state.pixelScale, cssColor);
    }
  }
}
