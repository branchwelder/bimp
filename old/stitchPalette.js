class StitchPalette {
  constructor() {
    this.entries = {
      knit: this.drawKnit,
      tuck: this.drawKnit,
      slip: this.drawKnit,
    };
    this.indexMap = ["knit", "slip", "tuck"];
    this.scale = [20, 20]; // The size of the pixel to draw to
  }

  drawKnit(paletteIndex, ctx, x, y) {
    // ctx.fillStyle = Palette.getRGB(value);
    ctx.fillRect(0, 0, 1, 1);
  }
}
