import { render, html, nothing } from "lit-html";
import { addPanZoom } from "./addPanZoom";
import { colorPicker } from "./colorPicker";
import { addCanvasInteraction } from "./addCanvasInteraction";
import { drawPicture } from "./utils";
import { actions } from "./actions";

import { Bimp } from "./bimp";

const GLOBAL_STATE = {
  activeTool: "brush", // tool can be move, brush, flood
  activeColor: 0, // palette index of the currently active color
  bitmap: Bimp.empty(8, 8, 4),
  panZoom: null,
  canvas: null,
  pixelScale: 30,
  actions: actions,
  history: [],

  syncCanvas: function () {
    drawPicture(this.bitmap, this.canvas, this.pixelScale);
  },
  updateState: function (changes) {
    Object.assign(this, changes);
  },
  doAction: function (action) {
    this.updateState(this.actions[action](this));
    this.syncCanvas();
  },
  applyTool: function (pos) {
    this.updateState({
      bitmap: this.bitmap[this.activeTool](pos, this.activeColor),
    });
    this.syncCanvas();
  },
};

function updateHeight(state, newHeight) {
  // const heightDiff = Number(newHeight) - state.bitmap.height;
  // if (Math.sign(heightDiff) === -1) {
  //   // remove rows
  //   state.bitmap.splice(heightDiff);
  // } else if (Math.sign(heightDiff) === 1) {
  //   // create rows of transparent and add them
  //   state.bitmap = state.bitmap.concat(
  //     Array.from(Array(heightDiff), (_) =>
  //       Array(state.bitmap[0].length).fill(0)
  //     )
  //   );
  // }
}

function updateWidth(state, newWidth) {
  // const widthDiff = Number(newWidth) - state.bitmap[0].length;
  // if (Math.sign(widthDiff) === -1) {
  //   // remove cols
  //   state.bitmap.forEach((row) => row.splice(widthDiff));
  // } else if (Math.sign(widthDiff) === 1) {
  //   // create cols of transparent and add them
  //   let cols = new Array(widthDiff).fill(0);
  //   state.bitmap.forEach((row) => row.push(...cols));
  // }
}

function setActiveColor(paletteIndex, state) {
  state.activeColor = Number(paletteIndex);
}

function addColor(state) {
  state.palette.push({ r: 1, g: 1, b: 1, a: 1 });
}

function updateColor(e, state, index) {
  const component = e.target.dataset.component;

  state.palette[index][component] = Number(e.target.value);
}

function renderControls(state) {
  return html`<div id="app-title">mixel</div>
    <button @click=${() => state.doAction("undo")}>Undo</button>
    <div class="control">
      <div class="control-header">
        <span>Size</span>
      </div>
      <div id="size">
        <div
          class="input-spinner"
          @click=${() => updateWidth(state, state.bitmap.width - 1)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          id="width"
          @change=${(e) => updateWidth(state, e.target.value)}
          value=${state.bitmap.width} />
        <div
          class="input-spinner"
          @click=${() => updateWidth(state, state.bitmap.width + 1)}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
        <span>by</span>
        <div
          class="input-spinner"
          @click=${() => updateHeight(state, state.bitmap.height - 1)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          @change=${(e) => updateHeight(state, e.target.value)}
          value=${state.bitmap.height} />
        <div
          class="input-spinner"
          @click=${() => updateHeight(state, state.bitmap.height + 1)}>
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
          class="tool-select ${state.activeTool == "brush" ? "selected" : ""}"
          @click=${() => (state.activeTool = "brush")}>
          <i class="fa-solid fa-paintbrush"></i>
        </div>
        <div
          class="tool-select ${state.activeTool == "move" ? "selected" : ""}"
          @click=${() => (state.activeTool = "move")}>
          <i class="fa-solid fa-up-down-left-right"></i>
        </div>
        <div
          class="tool-select ${state.activeTool == "flood" ? "selected" : ""}"
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
        ${state.bitmap.palette.map(
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
                    ${colorPicker(state.bitmap.palette[paletteIndex], (e) =>
                      updateColor(e, state, paletteIndex)
                    )}
                  </div>`}
            </div>`
        )}
      </div>
    </div>
    <div class="control">
      <div class="control-header">
        <span>Export</span>
      </div>
      <div id="formats">
        <button>BMP</button>
        <button>JPG</button>
        <button>PNG</button>
      </div>
    </div>`;
}

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

function centerCanvas(state) {
  const bb = state.canvas.getBoundingClientRect();
  GLOBAL_STATE.panZoom.setScaleXY({
    x: [bb.left, bb.right],
    y: [bb.top, bb.bottom],
  });
}

function init(state) {
  renderView(state);
  let workspace = document.getElementById("workspace");

  state.canvas = document.getElementById("canvas");
  state.panZoom = addPanZoom(workspace, state);

  addCanvasInteraction(canvas, state);

  drawPicture(state.bitmap, state.canvas, state.pixelScale);

  centerCanvas(state);
  window.requestAnimationFrame(r);
}

init(GLOBAL_STATE);
