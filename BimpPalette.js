export class BimpPalette {
  constructor(entries, drawFunc, bitDepth) {
    if (bitDepth) {
      if (Math.log2(entries.length) > bitDepth) {
        throw new Error(
          "Error creating Palette: too many entries for specified bit depth"
        );
      }
      this.bitDepth = bitDepth;
    } else {
      this.bitDepth = Math.ceil(Math.log2(entries.length));
    }

    this.entries = entries.map((entry) => {
      if (typeof entry != typeof entries[0]) {
        throw new Error("All palette entries must be the same type!");
      }
      return entry;
    });

    this.drawFunc = drawFunc;
    this.styles = { imageRendering: "pixelated" };
  }

  static getRGB([r, g, b]) {
    try {
      return `rgb(${r} ${g} ${b})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGB");
      return `rgb(0 0 0)`;
    }
  }

  static getRGBA(index) {
    try {
      const [r, g, b, a] = this.entries[index];
      return `rgb(${r} ${g} ${b} / ${a})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGBA");
      return `rgb(0 0 0 / 0)`;
    }
  }

  draw(ctx, bitmap, bitmapIndex, scale) {
    try {
      this.drawFunc(ctx, bitmap, bitmapIndex, scale);
    } catch (e) {
      console.error("Error in palette draw function!", e);
    }
  }
}
