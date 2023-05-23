import { render } from "lit-html";
import { global_state } from "./state";
import { view } from "./view";
import { PixelPalette } from "./palettes/PixelPalette";
import { actions } from "./actions";
import { addPanZoom } from "./panZoom";

function syncCanvas(canvas, state) {
  const active = state[state.activeEditor[0]][state.activeEditor[1]];
  PixelPalette.eight().render(canvas.getContext("2d"), active.bitmap);
}

function renderView(state, dispatch) {
  render(view(state, dispatch), document.body);
  const canvas = document.getElementById("main");
  syncCanvas(canvas, state);
}

function updateState(state, changes) {
  return { ...state, ...changes };
}

function init(state) {
  function dispatch(action, args) {
    let changes = {};

    try {
      changes = actions[action](state, args);
    } catch (e) {
      console.log(e);
    }

    state = updateState(state, changes);
    renderView(state, dispatch);
  }

  renderView(state, dispatch);
  const workspace = document.getElementById("view-pane");
  addPanZoom(workspace, dispatch);
  dispatch("center");
}

window.onload = (e) => init(global_state);
