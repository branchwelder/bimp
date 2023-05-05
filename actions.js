import { exporters } from "./utils";

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

  applyTool: (state, pos) => {
    return { bitmap: state.bitmap[state.activeTool](pos, state.activeColor) };
  },

  snapshot: (state) => {
    return { history: [state.bitmap, ...state.history] };
  },

  resize: (state, dims) => {
    return {
      bitmap: state.bitmap.resize(dims[0], dims[1]),
      history: [state.bitmap, ...state.history],
    };
  },

  centerCanvas: (state) => {
    state.panZoom.setScaleXY({
      x: [0, state.bitmap.width * state.pixelScale],
      y: [0, state.bitmap.height * state.pixelScale],
    });
    return {};
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
