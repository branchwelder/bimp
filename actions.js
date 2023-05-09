import { exporters, getEditorTarget } from "./utils";
import { Bimp } from "./bimp";

export const actions = {
  undo: (state) => {
    if (state.history.length === 0) {
      return {};
    }
    return {
      bitmap: state.history[0],
      history: state.history.slice(1),
    };
  },

  setActiveColor: (state, newColor) => {
    return { activeColor: newColor };
  },

  addLayer: (state) => {
    return {
      layers: [...state.layers, Bimp.empty(state.width, state.height, 0)],
      editorTarget: ["layers", state.layers.length],
    };
  },

  addColor: (state, newColor) => {
    return { palette: [...state.palette, newColor] };
  },

  updateColor: (state, { paletteIndex, component, newVal }) => {
    let updated = [...state.palette];
    updated[paletteIndex][component] = Number(newVal);
    return { palette: updated };
  },

  setActiveTool: (state, tool) => {
    return { activeTool: tool };
  },

  setEditorTarget: (state, target) => {
    return { editorTarget: target };
  },

  applyTool: (state, pos) => {
    // return { bitmap: state.bitmap[state.activeTool](pos, state.activeColor) };
    if (state.activeTool === "code") return {};
    let target = state.editorTarget[0];

    let copy = [...state[target]];

    copy[state.editorTarget[1]] = getEditorTarget(state)[state.activeTool](
      pos,
      state.activeColor
    );

    return {
      [target]: copy,
    };
  },

  snapshot: (state) => {
    return { history: [state.bitmap, ...state.history] };
  },

  resize: (state, dims) => {
    const updated = state.layers.map((layer) => layer.resize(dims[0], dims[1]));
    // return {
    //   bitmap: state.bitmap.resize(dims[0], dims[1]),
    //   history: [state.bitmap, ...state.history],
    // };
    return {
      layers: updated,
      width: dims[0],
      height: dims[1],
      // history: [state.bitmap, ...state.history],
    };
  },

  centerCanvas: (state) => {
    const currentBitmap = getEditorTarget(state);
    state.panZoom.setScaleXY({
      x: [0, currentBitmap.width * state.pixelScale],
      y: [0, currentBitmap.height * state.pixelScale],
    });
    return {};
  },

  tile: (state, tile) => {
    const target = state.editorTarget[0];
    const copy = [...state[target]];

    copy[state.editorTarget[1]] = Bimp.fromTile(
      state.width,
      state.height,
      tile
    );

    return {
      [target]: copy,
    };
  },

  newTile: (state) => {
    return { tiles: [...state.tiles, getEditorTarget(state)] };
  },

  download: (state, format) => {
    if (!exporters.hasOwnProperty(format)) {
      console.log("Oops! I don't know how to export to", format);
      return;
    }

    let element = document.createElement("a");
    element.setAttribute(
      "href",
      exporters[format](state.bitmap, state.palette)
    );
    element.setAttribute("download", `${state.title}.${format}`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return {};
  },
};
