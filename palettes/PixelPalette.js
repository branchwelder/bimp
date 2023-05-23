import { html } from "lit-html";
import { BimpPalette } from "../BimpPalette";

export class PixelPalette extends BimpPalette {
  constructor(entries) {
    super(entries);
    this.drawFunc = this.drawPixel;
  }

  select(index, onSelect) {
    const [r, g, b] = this.entries[index];
    return html`<div
      @click=${() => onSelect(index)}
      style="--r:${r}; --g:${g}; --b: ${b};"
      class="palette-select"></div>`;
  }

  modify(index, val) {}

  static bw() {
    return new PixelPalette([
      [0, 0, 0],
      [255, 255, 255],
    ]);
  }

  static eight() {
    return new PixelPalette([
      [0, 0, 0],
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
      [255, 0, 255],
      [255, 255, 0],
      [0, 255, 255],
      [255, 255, 255],
    ]);
  }

  render(ctx, bitmap) {
    const size = Math.floor(ctx.canvas.width / bitmap.width);

    ctx.globalCompositeOperation = "lighter";
    ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < bitmap.height; y++) {
      for (let x = 0; x < bitmap.width; x++) {
        ctx.translate(x * size, y * size);
        this.draw(ctx, bitmap, [x, y], size);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }

  drawPixel(ctx, bitmap, [x, y], size) {
    const paletteIndex = bitmap.pixel(x, y);
    ctx.fillStyle = BimpPalette.getRGB(this.entries[paletteIndex]);
    ctx.fillRect(0, 0, size, size);
  }
}
