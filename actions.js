function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

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

  setActiveColor: (state) => {
    console.log("COLOR");
  },

  snapshot: (state) => {
    // if (state.history.length) {
    //   if (arraysEqual(state.history[0].pixels, state.bitmap.pixels)) return {};
    // }
    return { history: [state.bitmap, ...state.history] };
  },
};
