export class Bimp {
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Bimp(width, height, pixels);
  }

  static fromTile(width, height, tile) {
    // tile should be a Bimp

    let tiled = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        tiled.push(tile.pixel(x % tile.width, y % tile.height));
      }
    }

    return new Bimp(width, height, tiled);
  }

  // static composite(width, height, bimpArray) {
  //   // bimpArray: array of bimps to layer. 0 will be highest
  //   let composite = [];

  //   for (let y = 0; y < height; y++) {
  //     for (let x = 0; x < width; x++) {
  //       let base = 0;
  //       for (const bim of bimpArray) {
  //         base += bim.pixel(x % bim.width, y % bim.height);
  //       }
  //       composite.push(base);
  //     }
  //   }

  //   return new Bimp(width, height, composite);
  // }

  resize(width, height) {
    let resized = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (y >= this.height || x >= this.width) {
          resized.push(0);
        } else {
          resized.push(this.pixel(x, y));
        }
      }
    }
    return new Bimp(width, height, resized);
  }

  make2d() {
    let copy = this.pixels.slice();
    let newArray = [];
    while (copy.length > 0) newArray.push(copy.splice(0, this.width));
    return newArray;
  }

  toImageData(palette) {
    try {
      const arr = new Uint8ClampedArray(this.pixels.length * 4);
      for (let i = 0; i < this.pixels.length; i += 1) {
        try {
          let { r, g, b, a } = palette[this.pixels[i]];

          arr[i * 4 + 0] = r * 255;
          arr[i * 4 + 1] = g * 255;
          arr[i * 4 + 2] = b * 255;
          arr[i * 4 + 3] = a * 255;
        } catch (e) {
          arr[i * 4 + 0] = 0;
          arr[i * 4 + 1] = 0;
          arr[i * 4 + 2] = 0;
          arr[i * 4 + 3] = 0;
        }
      }

      return new ImageData(arr, this.width);
    } catch (e) {
      console.error("Error creating ImageData from Bimp");
      return new ImageData(new Uint8ClampedArray(4), 1);
    }
  }

  pixel(x, y) {
    if (x > this.width - 1 || x < 0 || y > this.height - 1 || y < 0) {
      return -1;
    }
    return this.pixels.at(x + y * this.width);
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
