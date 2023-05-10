import { render } from "lit-html";
import { EditorView } from "@codemirror/view";

import { addPanZoom } from "./addPanZoom";
import { addCanvasInteraction } from "./addCanvasInteraction";

import { actions } from "./actions";
import { view } from "./ui/view";

import { Bimp } from "./bimp";
import { bitmapToCanvas } from "./utils";

const defaultPalette = [
  { r: 0, g: 0, b: 0, a: 0 },
  { r: 0, g: 0, b: 0, a: 1 },
  { r: 0.83, g: 0, b: 0, a: 1 },
  { r: 0.91, g: 0.43, b: 0, a: 1 },
  { r: 0.97, g: 1, b: 0, a: 1 },
  { r: 0.16, g: 0.82, b: 0.23, a: 1 },
  { r: 0.33, g: 0.47, b: 0.77, a: 1 },
  { r: 0.49, g: 0, b: 1, a: 1 },
  { r: 0.71, g: 0.2, b: 1, a: 1 },
];

const LAYERS = [
  {
    bitmap: new Bimp(3, 3, [5, 1, 0, 1, 5, 1, 0, 5, 0]),
    type: "direct",
  },
  {
    bitmap: Bimp.empty(16, 16, 0),
    type: "code",
    program: `return Bimp.fromTile(layers[0].width * 8, layers[0].height * 8, layers[0]);`,
  },
  {
    bitmap: Bimp.empty(16, 16, 0),
    type: "code",
    program: `const pix = [];
const width = 16;
const height = 16;
for (let y=0; y < height; y++) {
  for (let x=0; x < width; x++) {
    pix.push((x+y)%7+1);
  }
}

return new Bimp(width, height, pix);`,
  },
  {
    type: "code",
    bitmap: Bimp.empty(16, 16, 0),
    program: `const width = 16;
const height = 16;
const pix = [];

for (let y=0; y<height; y++) {
  for (let x=0; x<width; x++) {
    let base = layers[1].pixel(x,y);
    if (base == 0) {
      pix.push(base);
    } else {
      pix.push(layers[2].pixel(x,y));
    }
  }
}

return new Bimp(width, height, pix);`,
  },
];

const GLOBAL_STATE = {
  title: "untitled",
  activeTool: "brush", // tool can be move, brush, flood
  activeColor: 1, // palette index of the currently active color
  activeLayer: 0,
  panZoom: null,
  pixelScale: 20, // number of pixels canvas should use to show one pixel
  palette: defaultPalette,
  history: [],
  editorView: new EditorView(),
  layers: LAYERS,
};

let canvas = null;

function syncCanvas(state, canvasEl) {
  const bitmap = state.layers[state.activeLayer].bitmap;

  canvasEl.width = bitmap.width * state.pixelScale;
  canvasEl.height = bitmap.height * state.pixelScale;

  const ctx = canvasEl.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.scale(state.pixelScale, state.pixelScale);

  ctx.drawImage(bitmapToCanvas(bitmap, state.palette), 0, 0);
}

function renderView(state, dispatch) {
  render(view(state, dispatch), document.body);
}

function syncView() {
  const state = GLOBAL_STATE;

  renderView(state, dispatch);
  syncCanvas(state, canvas);
}

function dispatch(action, args, cb) {
  const { changes, postRender } = actions[action](GLOBAL_STATE, args, dispatch);

  Object.assign(GLOBAL_STATE, changes);

  syncView();

  if (postRender) postRender();

  if (cb) cb();
}

function init() {
  renderView(GLOBAL_STATE, dispatch);

  canvas = document.getElementById("canvas");
  GLOBAL_STATE.panZoom = addPanZoom(
    document.getElementById("workspace"),
    GLOBAL_STATE
  );

  addCanvasInteraction(canvas, GLOBAL_STATE, dispatch);
  dispatch("centerCanvas");
  dispatch("execute");
}

init();
