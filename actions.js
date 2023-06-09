import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { editorSetup } from "./editor/editor";

import { Bimp } from "./bimp";

let timeoutID = null;

function executeNS(namespace, code) {
  const func = function () {}.constructor;

  const keys = Object.keys(namespace);
  const vals = Object.values(namespace);

  const f = new func(...keys, code);

  return f(...vals);
}

function executeAll(layers, palette, startIndex) {
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
    layer.canvas.updateOffscreenCanvas(layer.bitmap, palette);
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
    const layers = [...state.layers];
    layers.push({
      type: "code",
      program: `const width = ${state.layers.at(-1).bitmap.width};
const height = ${state.layers.at(-1).bitmap.height};
const pixels = new Array(width * height).fill(0);

return new Bimp(width, height, pixels);`,
    });
    const updatedIndex = state.layers.length;

    const executed = executeAll(layers, state.palette);

    return {
      changes: {
        layers: executed,
      },
      postRender: () => {
        dispatch("setActiveLayer", updatedIndex);
      },
    };
  },

  addDirectLayer: (state, _, dispatch) => {
    const layers = [...state.layers];
    layers.push({
      bitmap: Bimp.empty(
        state.layers.at(-1).bitmap.width,
        state.layers.at(-1).bitmap.height,
        0
      ),
      type: "direct",
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
      layer.canvas.updateOffscreenCanvas(layer.bitmap, state.palette);
    });

    return {
      changes: { layers: newLayers },
    };
  },

  addColor: (state, newColor) => {
    return { changes: { palette: [...state.palette, newColor] } };
  },

  updateColor: (state, { paletteIndex, index, newVal }, dispatch) => {
    let updated = state.palette;
    updated.entries[paletteIndex][index] = Number(newVal);

    return {
      changes: { palette: updated },
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
    const newLayers = executeAll(state.layers, state.palette);
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

    layer.canvas.updateOffscreenCanvas(layer.bitmap, state.palette);

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
    const currentBitmap = state.layers[state.activeLayer].bitmap;
    state.panZoom.setScaleXY({
      x: [0, currentBitmap.width * state.palette.scale[0]],
      y: [0, currentBitmap.height * state.palette.scale[1]],
    });

    return { changes: {} };
  },

  // download: (state, format) => {
  //   if (!exporters.hasOwnProperty(format)) {
  //     console.log("Oops! I don't know how to export to", format);
  //     return;
  //   }

  //   let element = document.createElement("a");
  //   element.setAttribute(
  //     "href",
  //     exporters[format](state.bitmap, state.palette)
  //   );
  //   element.setAttribute("download", `${state.title}.${format}`);
  //   element.style.display = "none";
  //   document.body.appendChild(element);
  //   element.click();
  //   document.body.removeChild(element);

  //   return { changes: {} };
  // },
};
