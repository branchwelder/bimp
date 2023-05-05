import { render, html, nothing } from "lit-html";
import { addPanZoom } from "./addPanZoom";
import { colorPicker } from "./colorPicker";
import { addCanvasInteraction } from "./addCanvasInteraction";
import { actions } from "./actions";
import { drawPicture } from "./utils";

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

const GLOBAL_STATE = {
  activeTool: "brush", // tool can be move, brush, flood
  activeColor: 1, // palette index of the currently active color
  bitmap: Bimp.empty(32, 32, 0),
  panZoom: null,
  canvas: null,
  pixelScale: 30,
  palette: defaultPalette,
  actions: actions,
  history: [],

  syncCanvas: function () {
    drawPicture(this);
  },
  updateState: function (changes) {
    Object.assign(this, changes);
  },
  doAction: async function (action, ...args) {
    const stateChanges = this.actions[action](this, args);
    this.updateState(stateChanges);
    this.syncCanvas();
  },
  applyTool: function (pos) {
    this.updateState({
      bitmap: this.bitmap[this.activeTool](pos, this.activeColor),
    });
    this.syncCanvas();
  },
};

function setActiveColor(paletteIndex, state) {
  state.activeColor = Number(paletteIndex);
}

function addColor(state) {
  state.palette.push({ r: 1, g: 1, b: 1, a: 1 });
}

function updateColor(e, state, index) {
  const component = e.target.dataset.component;

  state.palette[index][component] = Number(e.target.value);
  drawPicture(state);
}

function renderControls(state) {
  return html`<div id="app-title">bimp</div>
    <div class="control-buttons">
      <button class="control-button" @click=${() => state.doAction("undo")}>
        <i class="fa-solid fa-rotate-left"></i>
      </button>
      <button
        class="control-button"
        @click=${() => state.doAction("centerCanvas")}>
        <i class="fa-solid fa-arrows-to-dot"></i>
      </button>
    </div>
    <div class="control">
      <div class="control-header">
        <span>Size</span>
      </div>
      <div id="size">
        <div
          class="input-spinner"
          @click=${() =>
            state.doAction(
              "resize",
              state.bitmap.width - 1,
              state.bitmap.height
            )}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          id="width"
          @change=${(e) =>
            state.doAction(
              "resize",
              Number(e.target.value),
              state.bitmap.height
            )}
          value=${state.bitmap.width} />
        <div
          class="input-spinner"
          @click=${() =>
            state.doAction(
              "resize",
              state.bitmap.width + 1,
              state.bitmap.height
            )}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
        <span>by</span>
        <div
          class="input-spinner"
          @click=${() =>
            state.doAction(
              "resize",
              state.bitmap.width,
              state.bitmap.height - 1
            )}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          @change=${(e) =>
            state.doAction(
              "resize",
              state.bitmap.width,
              Number(e.target.value)
            )}
          value=${state.bitmap.height} />
        <div
          class="input-spinner"
          @click=${() =>
            state.doAction(
              "resize",
              state.bitmap.width,
              state.bitmap.height + 1
            )}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
      </div>
    </div>
    <div class="control">
      <div class="control-header">
        <span>Tools</span>
      </div>
      <div id="tools">
        <div
          class="tool-select ${state.activeTool == "brush"
            ? "selected"
            : "not-selected"}"
          @click=${() => (state.activeTool = "brush")}>
          <i class="fa-solid fa-paintbrush"></i>
        </div>
        <div
          class="tool-select ${state.activeTool == "move"
            ? "selected"
            : "not-selected"}"
          @click=${() => (state.activeTool = "move")}>
          <i class="fa-solid fa-up-down-left-right"></i>
        </div>
        <div
          class="tool-select ${state.activeTool == "flood"
            ? "selected"
            : "not-selected"}"
          @click=${() => (state.activeTool = "flood")}>
          <i class="fa-solid fa-fill-drip"></i>
        </div>
      </div>
    </div>
    <div class="control">
      <div class="control-header">
        <span>Palette</span>
        <span class="add-color" @click=${() => addColor(state)}>
          <i class="fa-solid fa-plus"></i>
        </span>
      </div>
      <div id="palette" class="palette">
        ${state.palette.map(
          (color, paletteIndex) =>
            html`<div
              class="palette-color ${paletteIndex === state.activeColor
                ? "active-color"
                : ""}"
              data-color=${paletteIndex}
              style="--r: ${color.r}; --g: ${color.g}; --b: ${color.b}; --a: ${color.a}"
              @click=${() => setActiveColor(paletteIndex, state)}>
              ${paletteIndex === 0
                ? nothing
                : html`<div class="edit-color-container">
                    <a class="edit-button" href="#">
                      <i class="fa-solid fa-pen fa-fw fa-2xs"></i>
                    </a>
                    ${colorPicker(state.palette[paletteIndex], (e) =>
                      updateColor(e, state, paletteIndex)
                    )}
                  </div>`}
            </div>`
        )}
      </div>
    </div>`;
}

// <div class='control'>
//   <div class='control-header'>
//     <span>Export</span>
//   </div>
//   <div id='formats'>
//     <button>BMP</button>
//     <button>JPG</button>
//     <button>PNG</button>
//   </div>
// </div>;

function renderCanvas(state) {
  return html`<canvas id="canvas" class="transform-group"></canvas>`;
}

function view(state) {
  return html`<div class="container">
    <div id="controls">${renderControls(state)}</div>
    <div id="workspace">${renderCanvas(state)}</div>
  </div> `;
}

function renderView(state) {
  render(view(state), document.body);
}

function r() {
  renderView(GLOBAL_STATE);
  window.requestAnimationFrame(r);
}

function init(state) {
  renderView(state);
  let workspace = document.getElementById("workspace");

  state.canvas = document.getElementById("canvas");
  state.panZoom = addPanZoom(workspace, state);

  addCanvasInteraction(canvas, state);

  drawPicture(state);

  state.doAction("centerCanvas");
  window.requestAnimationFrame(r);
}

init(GLOBAL_STATE);
