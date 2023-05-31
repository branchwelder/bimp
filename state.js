import { Bitmap } from "./Bitmap";
import { PixelPalette } from "./palettes/PixelPalette";

// export class EditorState {
//   constructor({ width = 16, height = 16, palette = "pixels8" }) {
//     this.id = uuidv4();
//     this.width = width;
//     this.height = height;
//     this.palette = palette;
//     this.pixels = new Array(width * height).fill(color);
//     this.scale = 10;
//     this.history = [];
//     this.tool = "brush";
//     this.params = ["width", "height", "palette"];
//   }
//   // return {
//   //   bitmap: Bitmap.empty(10, 10, 3),
//   //   scale: 10,
//   //   pan: [0, 0],
//   //   tool: "brush",
//   //   params: {
//   //     width: { paramType: "number", value: 10 },
//   //     height: { paramType: "number", value: 10 },
//   //     palette: { paramType: "palette", value: "pixels8" },
//   //   },
//   //   forwardDeps: {},
//   // };
// }

export let global_state = {
  bitmaps: {
    tiling: {
      bitmap: Bitmap.empty(10, 10, 3),
      scale: 10,
      pan: [0, 0],
      tool: "brush",
      palette: PixelPalette.eight(),
      color: 1,
      params: {
        width: { paramType: "number", value: 10 },
        height: { paramType: "number", value: 10 },
        palette: { paramType: "palette", value: "pixels8" },
      },
      forwardDeps: {
        modifiers: ["tiledRepeat"],
      },
    },
    tile4: {
      bitmap: Bitmap.empty(10, 10, 2),
      scale: 10,
      pan: [0, 0],
      tool: "brush",
      color: 1,
      palette: PixelPalette.eight(),

      params: {
        width: { paramType: "number", value: 10 },
        height: { paramType: "number", value: 10 },
        palette: { paramType: "palette", value: "pixels8" },
      },
    },
    tile8: {
      bitmap: Bitmap.empty(10, 10, 1),
      scale: 10,
      pan: [0, 0],
      tool: "brush",
      palette: PixelPalette.eight(),

      color: 1,
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
  layout: {
    sizes: [50, 50],
    children: [{ sizes: [50, 50], children: ["tile4", "tile8"] }, "tiling"],
  },
};
