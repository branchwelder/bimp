export class BimpCanvas {
  constructor(config) {
    this.bitmap = config.bitmap;
    this.palette = config.palette;
    this.scale = config.scale;

    this.dom = this.buildDom();

    this.updateScale();
    this.renderBitmap();
  }

  buildDom() {
    const canvasEl = document.createElement("canvas");
    canvasEl.transformOrigin = `0px 0px`;
    return canvasEl;
  }

  updateScale() {
    this.dom.height = this.bitmap.height * this.scale;
    this.dom.width = this.bitmap.width * this.scale;
  }

  syncState(state) {
    if (this.bitmap != state.bitmap) {
      this.bitmap = state.bitmap;
    }
    if (this.scale != state.scale) {
      this.scale = state.scale;
    }

    this.updateScale();
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
