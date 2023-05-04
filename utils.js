const trigger = (e) => e.composedPath()[0];
const matchesTrigger = (e, selectorString) =>
  trigger(e).matches(selectorString);

export const createListener =
  (target) => (eventName, selectorString, event, args) => {
    // focus doesn't work with this, focus doesn't bubble, need focusin
    target.addEventListener(
      eventName,
      (e) => {
        e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
        if (selectorString === "" || matchesTrigger(e, selectorString))
          event(e);
      },
      args ?? {}
    );
  };

function drawPixel({ x, y }, canvas, scale, color) {
  let cx = canvas.getContext("2d");

  cx.fillStyle = color;
  cx.fillRect(x * scale, y * scale, scale, scale);
}

export function drawPicture(picture, canvas, scale) {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      const cssColor = picture.pixelRGBA(x, y);
      drawPixel({ x, y }, canvas, scale, cssColor);
    }
  }
}
