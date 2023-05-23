import { Bitmap } from "./Bitmap";
import { PixelPalette } from "./palettes/PixelPalette";

export let global_state = {
  bitmaps: {
    pattern: {
      bitmap: Bitmap.empty(10, 10, 3),
      scale: 10,
      pan: [0, 0],
      tool: "brush",
      params: {
        width: { paramType: "number", value: 10 },
        height: { paramType: "number", value: 10 },
        palette: { paramType: "palette", value: "pixels8" },
      },
      forwardDeps: {
        modifiers: ["tiledRepeat"],
      },
    },
    tile: {
      bitmap: Bitmap.empty(10, 10, 0),
      scale: 10,
      pan: [0, 0],
      tool: "flood",
      params: {
        width: { paramType: "number", value: 10 },
        height: { paramType: "number", value: 10 },
        palette: { paramType: "palette", value: "pixels8" },
      },
    },
  },
  palettes: {
    pixels8: {
      palette: PixelPalette.eight(),
      forwardDeps: {
        bitmaps: ["pattern", "tile"],
      },
    },
    pixels2: {
      palette: PixelPalette.eight(),
      forwardDeps: {},
    },
  },
  modifiers: {
    tiledRepeat: {
      params: {
        width: { paramType: "number", value: 100 },
        height: { paramType: "number", value: 100 },
        baseTile: { paramType: "bitmap", value: "bitmaps.pattern" },
      },
      code: `let tiled = [];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    tiled.push(baseTile.pixel(x % baseTile.width, y % baseTile.height));
  }
}

return new Bitmap(width, height, tiled);`,
    },
  },
  activeEditor: ["bitmaps", "tile"],
};
