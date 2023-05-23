export class BimpCanvas {
  constructor(config) {
    this.bitmap = config.bitmap;
    this.palette = config.palette;
    this.pixelScale = config.pixelScale;

    this.dom = this.buildDom();

    this.updatePixelScale();
    this.renderBitmap();
  }

  buildDom() {
    const canvasEl = document.createElement("canvas");
    canvasEl.id = "bitmap-canvas";
    canvasEl.transformOrigin = `0px 0px`;
    return canvasEl;
  }

  updatePixelScale() {
    this.dom.height = this.bitmap.height * this.pixelScale;
    this.dom.width = this.bitmap.width * this.pixelScale;
  }

  syncState(state) {
    if (this.bitmap != state.bitmap) {
      this.bitmap = state.bitmap;
    }
    if (this.pixelScale != state.pixelScale) {
      this.pixelScale = state.pixelScale;
    }

    this.updatePixelScale();
    this.renderBitmap();

    const [x, y] = state.pan;

    this.dom.style.transform = `translate(${Math.floor(x)}px, ${Math.floor(
      y
    )}px)`;
  }

  renderBitmap() {
    const ctx = this.dom.getContext("2d");
    this.palette.render(ctx, this.bitmap);
  }
}
