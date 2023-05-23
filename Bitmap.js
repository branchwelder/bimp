"use strict";

export class Bitmap {
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = new Uint8ClampedArray(pixels);
  }

  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Bitmap(width, height, pixels);
  }

  // static fromTile(width, height, tile) {
  //   // tile should be a Bitmap

  //   let tiled = [];

  //   for (let y = 0; y < height; y++) {
  //     for (let x = 0; x < width; x++) {
  //       tiled.push(tile.pixel(x % tile.width, y % tile.height));
  //     }
  //   }

  //   return new Bitmap(width, height, tiled);
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
    return new Bitmap(width, height, resized);
  }

  make2d() {
    let copy = Array.from(this.pixels).slice();
    let newArray = [];
    while (copy.length > 0) newArray.push(copy.splice(0, this.width));
    return newArray;
  }

  pixel(x, y) {
    if (x > this.width - 1 || x < 0 || y > this.height - 1 || y < 0) {
      return -1;
    }
    return this.pixels.at(x + y * this.width);
  }

  apply(changes) {
    let copy = this.pixels.slice();
    for (let { x, y, color } of changes) {
      copy[x + y * this.width] = color;
    }
    return new Bitmap(this.width, this.height, copy);
  }

  brush({ x, y }, color) {
    let change = { x, y, color: color };
    return this.apply([change]);
  }

  flood({ x, y }, color) {
    const around = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];
    let targetColor = this.pixel(x, y);
    let changes = [{ x, y, color: color }];
    for (let done = 0; done < changes.length; done++) {
      for (let { dx, dy } of around) {
        let x = changes[done].x + dx,
          y = changes[done].y + dy;
        if (
          x >= 0 &&
          x < this.width &&
          y >= 0 &&
          y < this.height &&
          this.pixel(x, y) == targetColor &&
          !changes.some((p) => p.x == x && p.y == y)
        ) {
          changes.push({ x, y, color: color });
        }
      }
    }
    return this.apply(changes);
  }

  rect(start, end, color) {
    let xStart = Math.min(start.x, end.x);
    let yStart = Math.min(start.y, end.y);
    let xEnd = Math.max(start.x, end.x);
    let yEnd = Math.max(start.y, end.y);
    let changes = [];

    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        changes.push({ x, y, color });
      }
    }
    return this.apply(changes);
  }
}
