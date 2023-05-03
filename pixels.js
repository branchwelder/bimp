export class Pixels {
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }
  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Pixels(width, height, pixels);
  }
  pixel(x, y) {
    const pix = this.pixels[x + y * this.width];
    return `rgb(${pix.r} ${pix.g} ${pix.b} / ${pix.a})`;
  }
  draw(pixels) {
    let copy = this.pixels.slice();
    for (let { x, y, color } of pixels) {
      copy[x + y * this.width] = color;
    }
    return new Picture(this.width, this.height, copy);
  }
}
