import { EditorView } from "@codemirror/view";
import { render } from "lit-html";

import { canvasEvents } from "./addCanvasInteraction";
import { addPanZoom } from "./addPanZoom";

import { actions } from "./actions";
import { view } from "./ui/view";

import { Bimp, BimpCanvas } from "./bimp";
import { pixel2, stitchPalette, colorP2 } from "./palette";

import { patterns } from "./patterns";

import { brush, flood, rect, line, pan } from "./tools";

const testLayers = [
  {
    id: "layer-asdf",
    bitmap: new Bimp(24, 20, patterns.triangle),
    type: "direct",
    program: null,
    palette: pixel2,
  },
  // {
  //   id: "layer-fghj",
  //   type: "code",
  //   palette: pixel2,
  //   bitmap: Bimp.empty(16, 16, 0),
  //   program: `const width = 16;
  // const height = 16;

  // return new Bimp(layers[0].width, layers[0].height, layers[0].pixels);`,
  // },
  {
    id: "layer-sdfg",
    bitmap: Bimp.empty(1, 1, 0),
    type: "code",
    palette: stitchPalette,
    program: `return Bimp.fromTile(layers[0].width * 3, layers[0].height * 4, layers[0]);`,
  },
  {
    id: "layer-fghj",
    type: "code",
    palette: colorP2,
    bitmap: Bimp.empty(16, 16, 0),
    program: `const width = 72;
const height = 80;
let pixels = [];
for (let row=0; row<height; row+=2) {
  const current = row % 4 == 0 ? 1 : 0;
  pixels.push(...new Array(width*2).fill(current))
}

return new Bimp(width, height, pixels);`,
  },
  {
    id: "layer-asdfasdf",
    type: "code",
    palette: colorP2,
    bitmap: Bimp.empty(16, 16, 0),
    program: `const w = 72;
const h = 80;
const SLIP = 0;
const KNIT = 1;

let pixels = new Array(w*h).fill(0);

for (let y=h-1; y>=0; y--) {
  for (let x=0; x<w; x++) {
    let currentColor = layers[2].pixel(x,y);
    if (layers[1].pixel(x,y)==SLIP) {
      pixels[y*w+x] = currentColor;
    } else {
      pixels[y*w+x] = 2;
    }
  }
}

return new Bimp(w, h, pixels);`,
  },
  {
    id: "colorpreview",
    type: "code",
    palette: colorP2,
    bitmap: Bimp.empty(16, 16, 0),
    program: `const w = 72;
const h = 80;

const NONE = 2;

let pattern = layers[3];
let width = pattern.width;
let rows = []

for (let y=0; y<h; y++) {
  let row = [];
  for (let x=0; x<width; x++) {
    let color = pattern.pixel(x,y);
    if (color!=NONE) {
      row.push(color);
    } else {
      let up = 0;
      let found = false;
      while(!found) {
        let test = pattern.pixel(x,y+up);
        if (test==NONE) {
                  up+=1;
        }else if(test==0 || test==1) {
          for (let i = 0; i<up; i++) {
                      pattern.pixels[(y+i) * width + x] = test;
          }
          found=true;
          row.push(test);
          pattern.pixels[(y+up) * width + x] = NONE;
        } else {
          // not there
          found = true;
          row.push(NONE);
        }
      }
    }
  }
  rows.push(row);
}


return new Bimp(width, rows.length, rows.flat());`,
  },
  {
    id: "layer-vcbn",
    bitmap: new Bimp(9, 9, patterns.beetle),
    type: "direct",
    program: null,
    palette: colorP2,
  },
  {
    id: "layer-yuio",
    bitmap: Bimp.empty(1, 1, 0),
    type: "code",
    palette: colorP2,
    program: `return Bimp.fromTile(layers[5].width * 7, layers[5].height * 7, layers[5]);`,
  },
];

const GLOBAL_STATE = {
  title: "untitled",
  activeTool: "brush", // tool can be move, brush, flood
  activeColor: 0, // palette index of the currently active color
  activeLayer: 0,
  panZoom: null,
  pixelScale: 20, // number of pixels canvas should use to show one pixel
  palette: null,
  history: [],
  editorView: new EditorView(),
  layers: null,
};

let canvas = null;

function syncPreviews(state) {
  for (const layer of state.layers) {
    const canvasEl = document.querySelector(`[data-layerid=${layer.id}]`);

    layer.canvas.transferOffscreenToCanvas(canvasEl);
  }
}

function syncCanvas(state, canvasEl) {
  state.layers[state.activeLayer].canvas.transferOffscreenToCanvas(canvasEl);
}

function renderView(state, dispatch) {
  render(view(state, dispatch), document.body);
}

function syncView() {
  const state = GLOBAL_STATE;

  renderView(state, dispatch);

  syncCanvas(state, canvas);
  syncPreviews(state);
}

async function dispatch(action, args, cb) {
  try {
    const { changes, postRender } = actions[action](
      GLOBAL_STATE,
      args,
      dispatch
    );

    Object.assign(GLOBAL_STATE, changes);

    syncView();

    if (postRender) postRender();

    if (cb) cb();
  } catch (e) {
    console.error(`Problem in action ${action}`);
    console.error(e);
  }
}

const tools = {
  brush,
  flood,
  rect,
  line,
  pan,
};

function init() {
  const initialLayers = testLayers.map((layer) => {
    return {
      id: layer.id,
      bitmap: layer.bitmap,
      type: layer.type,
      program: layer.program,
      palette: layer.palette,
      canvas: new BimpCanvas(layer.bitmap, layer.palette),
    };
  });

  GLOBAL_STATE.layers = initialLayers;
  renderView(GLOBAL_STATE, dispatch);

  canvas = document.getElementById("canvas");
  GLOBAL_STATE.panZoom = addPanZoom(
    document.getElementById("canvas-container"),
    GLOBAL_STATE
  );

  // Tools functions return a move handler that is fed
  // the current canvas / pixel coordinates
  const onDown = (pos) => {
    let tool = tools[GLOBAL_STATE.activeTool];
    let toolMove = tool(pos, GLOBAL_STATE, dispatch);
    if (toolMove) return (pos) => toolMove(pos, GLOBAL_STATE);
  };

  canvasEvents(canvas, GLOBAL_STATE, onDown);

  dispatch("centerCanvas");
  dispatch("execute");
}

init();
