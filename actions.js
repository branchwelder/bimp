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

  setActiveTool: (state, newTool) => {
    return { activeTool: newTool };
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
};
