import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { editorSetup } from "./editor/editor";

import { Bimp, BimpCanvas } from "./bimp";
import { pixel2 } from "./palette";

let timeoutID = null;

import { exporters } from "./utils";

function executeNS(namespace, code) {
  const func = function () {}.constructor;

  const keys = Object.keys(namespace);
  const vals = Object.values(namespace);

  const f = new func(...keys, code);

  return f(...vals);
}

function executeAll(layers, startIndex) {
  // starting from the first layer, execute the layer program. each layer
  // gets an array with all of the results of previous layers
  // index is the layer to start executing at

  if (!startIndex) startIndex = 0;

  const newLayers = [...layers];

  const results = [];

  for (let i = 0; i < newLayers.length; i++) {
    const layer = newLayers[i];
    if (i < startIndex) results.push(layer.bitmap);
    else if (layer.type == "code") {
      let newBmp;
      try {
        const namespace = {
          Bimp,
          layers: results,
        };

        newBmp = executeNS(namespace, layer.program);

        results.push(newBmp);
        layer.bitmap = newBmp;
      } catch (e) {
        console.log("Error in layer", i);
        console.error(e);
      }
    } else {
      // if the layer is not code just pass the bitmap through
      results.push(layer.bitmap);
    }
    layer.canvas.updateOffscreenCanvas(layer.bitmap, layer.palette);
  }

  return newLayers;
}

export const actions = {
  undo: (state) => {
    if (state.history.length === 0) {
      return {};
    }
    return {
      changes: {
        bitmap: state.history[0],
        history: state.history.slice(1),
      },
    };
  },

  setActiveColor: (state, newColor) => {
    return { changes: { activeColor: newColor } };
  },

  setActiveTool: (state, tool) => {
    return { changes: { activeTool: tool } };
  },

  addCodeLayer: (state, _, dispatch) => {
    const newBimp = Bimp.empty(10, 10, 0);
    const layers = [...state.layers];
    layers.push({
      id: "testcode",
      type: "code",
      bitmap: newBimp,
      palette: pixel2,
      program: `const width = 10;
const height = 10;
const pixels = new Array(width * height).fill(0);

return new Bimp(width, height, pixels);`,
      canvas: new BimpCanvas(newBimp, pixel2),
    });
    const updatedIndex = state.layers.length;

    const executed = executeAll(layers);

    return {
      changes: {
        layers: executed,
      },
      postRender: () => {
        dispatch("setActiveLayer", updatedIndex);
      },
    };
  },

  bimpFromImage: (state, img, dispatch) => {
    const { bitmap, palette } = Bimp.fromImage(img);
    console.log(bitmap);
    console.log(palette.entries.length, palette.bitDepth);

    const layers = [...state.layers];
    layers.push({
      id: "test",
      bitmap: bitmap,
      type: "image",
      palette: palette,
      canvas: new BimpCanvas(bitmap, palette),
    });

    const updatedIndex = state.layers.length;

    return {
      changes: {
        layers: layers,
      },
      postRender: () => {
        dispatch("setActiveLayer", updatedIndex);
      },
    };
  },

  addImageLayer: (state, e, dispatch) => {
    const picture = new FileReader();

    picture.readAsDataURL(e.target.files[0]);
    picture.addEventListener("load", (e) => {
      let img = new Image();
      img.onload = function () {
        dispatch("bimpFromImage", img);
      };
      img.src = e.target.result;
    });

    return {
      changes: {},
    };
  },

  addDirectLayer: (state, _, dispatch) => {
    const newBimp = Bimp.empty(
      state.layers.at(-1).bitmap.width,
      state.layers.at(-1).bitmap.height,
      0
    );
    const layers = [...state.layers];
    layers.push({
      id: "test",
      bitmap: newBimp,
      type: "direct",
      canvas: new BimpCanvas(newBimp, state.layers.at(-1).palette),
    });

    const updatedIndex = state.layers.length;

    return {
      changes: {
        layers: layers,
      },
      postRender: () => {
        dispatch("setActiveLayer", updatedIndex);
      },
    };
  },

  refreshCanvas: (state) => {
    const newLayers = [...state.layers];
    newLayers.forEach((layer) => {
      layer.canvas.bitmap = null;
      layer.canvas.updateOffscreenCanvas(layer.bitmap, layer.palette);
    });

    return {
      changes: { layers: newLayers },
    };
  },

  // addColor: (state, newColor) => {
  //   // const active = state.layers[state.activeLayer];

  //   return { changes: { palette: [...state.palette, newColor] } };
  // },

  updateColor: (state, { paletteIndex, index, newVal }, dispatch) => {
    const newLayers = [...state.layers];

    let updated = newLayers[state.activeLayer].palette;
    updated.entries[paletteIndex][index] = Number(newVal);
    newLayers[state.activeLayer].palette = updated;

    return {
      changes: { layers: newLayers },
      postRender: () => dispatch("refreshCanvas"),
    };
  },

  executeTimeout: (state, _, dispatch) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => dispatch("execute"), 500);

    return {
      changes: {},
    };
  },

  execute: (state) => {
    timeoutID = null;
    const newLayers = executeAll(state.layers);
    return { changes: { layers: newLayers } };
  },

  setProgram: (state, { program }, dispatch) => {
    const newLayers = [...state.layers];
    newLayers[state.activeLayer].program = program;

    return {
      changes: { layers: newLayers },
      postRender: () => dispatch("executeTimeout"),
    };
  },

  setActiveLayer: (state, newLayerID, dispatch) => {
    if (state.layers[newLayerID].type === "code") {
      function makeState(program) {
        return EditorState.create({
          doc: program,
          extensions: [editorSetup, javascript(), updateListener()],
        });
      }

      function updateListener() {
        return EditorView.updateListener.of((v) => {
          const program = v.state.doc.toString();
          dispatch("setProgram", { program });
        });
      }

      state.editorView.setState(makeState(state.layers[newLayerID].program));

      return {
        changes: { activeLayer: newLayerID },
        postRender: () => {
          document.getElementById("editor").appendChild(state.editorView.dom);
          dispatch("centerCanvas");
        },
      };
    }

    return {
      changes: { activeLayer: newLayerID },
      postRender: () => {
        dispatch("centerCanvas");
      },
    };
  },

  applyTool: (state, pos, dispatch) => {
    const active = state.layers[state.activeLayer];
    const newLayers = [...state.layers];

    const layer = newLayers[state.activeLayer];

    if (active.type === "code") return { changes: {} };

    layer.bitmap = active.bitmap[state.activeTool](pos, state.activeColor);

    layer.canvas.updateOffscreenCanvas(layer.bitmap, layer.palette);

    return {
      changes: {
        layers: newLayers,
      },
      postRender: () => dispatch("executeTimeout"),
    };
  },

  updateActiveBitmap: (state, { bitmap }, dispatch) => {
    const active = state.layers[state.activeLayer];
    const newLayers = [...state.layers];

    const layer = newLayers[state.activeLayer];

    if (active.type === "code") return { changes: {} };

    layer.bitmap = bitmap;
    layer.canvas.updateOffscreenCanvas(layer.bitmap, layer.palette);

    return {
      changes: {
        layers: newLayers,
      },
      postRender: () => dispatch("executeTimeout"),
    };
  },

  snapshot: (state) => {
    // TODO fix history with recent changes
    console.log("SNAP");
    return { changes: {} };
  },

  resizeTarget: (state, [width, height], dispatch) => {
    const newLayers = [...state.layers];

    newLayers[state.activeLayer].bitmap = newLayers[
      state.activeLayer
    ].bitmap.resize(width, height);

    return {
      changes: {
        layers: newLayers,
      },
      postRender: () => dispatch("executeTimeout"),
    };
  },

  copyPixelArray: (state) => {
    navigator.clipboard.writeText(
      state.layers[state.activeLayer].bitmap.pixels
    );
    return {
      changes: {},
    };
  },

  centerCanvas: (state) => {
    const currentLayer = state.layers[state.activeLayer];
    const currentBitmap = currentLayer.bitmap;
    const palette = currentLayer.palette;

    state.panZoom.setScaleXY({
      x: [0, currentBitmap.width * palette.scale[0]],
      y: [0, currentBitmap.height * palette.scale[1]],
    });

    return { changes: {} };
  },

  download: (state, format) => {
    if (!exporters.hasOwnProperty(format)) {
      console.log("Oops! I don't know how to export to", format);
      return;
    }

    const active = state.layers[state.activeLayer];

    let element = document.createElement("a");
    element.setAttribute(
      "href",
      exporters[format](active.bitmap, active.palette)
    );
    element.setAttribute("download", `${state.title}.${format}`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return { changes: {} };
  },
};
