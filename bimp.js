const defaultPalette = [
  { r: 0, g: 0, b: 0, a: 0 },
  { r: 0, g: 0, b: 0, a: 1 },
  { r: 1, g: 0, b: 0, a: 1 },
  { r: 0, g: 1, b: 0, a: 1 },
  { r: 0, g: 0, b: 1, a: 1 },
  { r: 1, g: 1, b: 0, a: 1 },
  { r: 1, g: 0, b: 1, a: 1 },
  { r: 0, g: 1, b: 1, a: 1 },
];

export class Bimp {
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
    this.palette = defaultPalette;
  }

  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Bimp(width, height, pixels);
  }

  pixel(x, y) {
    return this.palette[this.pixels[x + y * this.width]];
  }

  pixelRGBA(x, y) {
    const pixel = this.pixel(x, y);
    return `rgb(${pixel.r * 255} ${pixel.g * 255} ${pixel.b * 255} / ${
      pixel.a * 255
    })`;
  }

  draw(changes) {
    let copy = this.pixels.slice();
    for (let { x, y, color } of changes) {
      copy[x + y * this.width] = color;
    }
    return new Bimp(this.width, this.height, copy);
  }

  brush({ x, y }, color) {
    let drawn = { x, y, color: color };
    return this.draw([drawn]);
  }

  flood({ x, y }, color) {
    const around = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];
    let targetColor = this.pixel(x, y);
    let drawn = [{ x, y, color: color }];
    for (let done = 0; done < drawn.length; done++) {
      for (let { dx, dy } of around) {
        let x = drawn[done].x + dx,
          y = drawn[done].y + dy;
        if (
          x >= 0 &&
          x < this.width &&
          y >= 0 &&
          y < this.height &&
          this.pixel(x, y) == targetColor &&
          !drawn.some((p) => p.x == x && p.y == y)
        ) {
          drawn.push({ x, y, color: color });
        }
      }
    }
    return this.draw(drawn);
  }
}
