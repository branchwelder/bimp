class Palette {
  constructor(entries, scale, drawFunc, bitDepth) {
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
    // Object.freeze(this.entries);

    this.scale = scale ?? [1, 1];

    this.drawFunc = drawFunc;
  }

  addEntry(entry) {
    this.entries.push(entry);
  }

  static getRGB([r, g, b]) {
    try {
      return `rgb(${r} ${g} ${b})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGB");
      return `rgb(0 0 0)`;
    }
  }

  getRGBA(index) {
    try {
      const [r, g, b, a] = this.entries[index];
      return `rgb(${r} ${g} ${b} / ${a})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGBA");
      return `rgb(0 0 0 / 0)`;
    }
  }

  draw(paletteIndex, ctx, x, y) {
    // a method to draw the specified palette index
    try {
      this.drawFunc(ctx, this.entries[paletteIndex], x, y);
    } catch (e) {
      console.error("Error in palette draw function!", e);
    }
  }
}

class PixelPalette extends Palette {
  constructor(entries) {
    super(entries, [1, 1]);
    this.drawFunc = this.drawPixel;
  }

  drawPixel(ctx, value, x, y) {
    ctx.fillStyle = Palette.getRGB(value);
    ctx.fillRect(0, 0, 1, 1);
  }
}

const p2 = [0, 1];

const p4 = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const p8 = [
  [0, 0, 0],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 0, 255],
  [255, 255, 0],
  [0, 255, 255],
  [255, 255, 255],
];

const p16 = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 0],
  [0, 1, 1],
  [1, 1, 1],
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 0],
  [0, 1, 1],
  [1, 1, 1],
];

function dots(ctx, value, x, y) {
  ctx.fillStyle = Palette.getRGB(value);
  ctx.beginPath();
  ctx.arc(
    this.scale[0] / 2,
    this.scale[1] / 2,
    Math.abs(this.scale[0] / 2 - x),
    0,
    2 * Math.PI
  );

  ctx.fill();
}

function shrinkingDots(ctx, value, x, y) {
  ctx.fillStyle = Palette.getRGB(value);
  ctx.beginPath();
  ctx.arc(
    this.scale[0] / 2,
    this.scale[1] / 2,
    Math.abs(this.scale[0] - (x * y) / 4),
    0,
    2 * Math.PI
  );

  ctx.fill();
}

function squares(ctx, value) {
  ctx.fillStyle = Palette.getRGB(value);
  ctx.fillRect(0, 0, 1, 1);
}

const palette2 = new Palette(p2, [20, 20]);
const palette4 = new Palette(p4, [20, 20]);

const palette16 = new Palette(p16, [20, 20]);

const pixel8 = new PixelPalette(p8);
const dotPalette = new Palette(p8, [100, 100], dots);
const booleanMask = new Palette(p2, [1, 1], squares);

export { pixel8, booleanMask, Palette, PixelPalette };
