import { render } from "lit-html";
import { state } from "./state";
import { view } from "./view";
import { BimpCanvas } from "./BimpCanvas";
import { PixelPalette } from "./palettes/PixelPalette";

function dispatch(obj) {
  // obj can either be an action to carry out, or a change to the state
  if ("action" in obj) {
    console.log("trying to do action:", obj["action"]);
    // should re-render here
  } else {
    // otherwise do state updates
  }
}

function syncCanvas(canvas, state) {
  const active = state[state.activeEditor[0]][state.activeEditor[1]];
  console.log(active);

  PixelPalette.eight().render(canvas.getContext("2d"), active.bitmap);
}

function renderView(state, dispatch) {
  render(view(state, dispatch), document.body);
  const canvas = document.getElementById("main");
  syncCanvas(canvas, state);
}

function updateState(state, action) {
  return { ...state, ...action };
}

function init() {
  renderView(state, dispatch);
}

window.onload = init;
