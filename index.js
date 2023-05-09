import { render } from "lit-html";

import { addPanZoom } from "./addPanZoom";
import { addCanvasInteraction } from "./addCanvasInteraction";

import { actions } from "./actions";
import { view } from "./ui/view";

import { Bimp } from "./bimp";

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

const tiles = [
  {
    pixels: [0, 1, 1, 0],
    width: 2,
    height: 2,
  },
  {
    pixels: [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
    width: 4,
    height: 4,
  },
];

const GLOBAL_STATE = {
  title: "untitled",
  activeTool: "brush", // tool can be move, brush, flood
  activeColor: 1, // palette index of the currently active color
  activeEditor: ["layers", 0],
  bitmap: Bimp.empty(16, 16, 0), // starting bitmap is empty
  panZoom: null,
  canvas: null,
  pixelScale: 30, // number of pixels canvas should use to show one pixel
  palette: defaultPalette,
  history: [],
  layers: [Bimp.empty(16, 16, 0)],
  tiles: tiles.map((tile) => new Bimp(tile.width, tile.height, tile.pixels)),
};

let canvas = null;

const activeBimp = (state) => {
  return state[state.activeEditor[0]][state.activeEditor[1]];
};

function renderView(state, dispatch) {
  render(view(state, dispatch), document.body);
}

function pixelRGBA(state, x, y) {
  const pixel = state.palette[state.bitmap.pixel(x, y)];
  // const pixel = state.palette[activeBimp(state).pixel(x, y)];

  return `rgb(${pixel.r * 255} ${pixel.g * 255} ${pixel.b * 255} / ${pixel.a})`;
}

function drawPixel(canvasEl, { x, y }, scale, color) {
  let cx = canvasEl.getContext("2d");

  cx.fillStyle = color;
  cx.fillRect(x * scale, y * scale, scale, scale);
}

function syncCanvas(state, canvasEl) {
  // const bitmap = activeBimp(state);
  const bitmap = state.bitmap;

  canvasEl.width = bitmap.width * state.pixelScale;
  canvasEl.height = bitmap.height * state.pixelScale;

  for (let y = 0; y < bitmap.height; y++) {
    for (let x = 0; x < bitmap.width; x++) {
      const cssColor = pixelRGBA(state, x, y);
      drawPixel(canvasEl, { x, y }, state.pixelScale, cssColor);
    }
  }
}

function syncState() {
  renderView(GLOBAL_STATE, dispatch);
  syncCanvas(GLOBAL_STATE, canvas);
}

function dispatch(action, args, cb) {
  const changes = actions[action](GLOBAL_STATE, args);

  Object.assign(GLOBAL_STATE, changes);

  syncState();

  if (cb) cb();
}

function init(state) {
  renderView(state, dispatch);

  canvas = document.getElementById("canvas");
  state.panZoom = addPanZoom(document.getElementById("workspace"), state);

  addCanvasInteraction(canvas, state, dispatch);

  dispatch("centerCanvas");
}

init(GLOBAL_STATE);
