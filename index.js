import { render, html } from "lit-html";
import { addPanZoom } from "./addPanZoom";
import { addPixelInteraction } from "./addPixelInteraction";
import { addPaletteInteraction } from "./addPaletteInteraction";

let testBitmap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];

let palette = [{ hex: "#2976a3" }, { hex: "#d9c034" }];

const GLOBAL_STATE = {
  bitmap: testBitmap,
  palette: palette,
  color: 0,
  panZoom: null,
  tool: "brush",
  setPixelColor: function (row, col) {
    this.bitmap[row][col] = this.color;
  },
  setCurrentColor: function (newColor) {
    this.color = newColor;
  },
};

function renderBitmap(bitmap) {
  return html`<div id="artwork" class="transform-group">
    ${bitmap.map(
      (row, rowIndex) =>
        html`<div class="row">
          ${row.map(
            (pixel, colIndex) => html`<div
              class="pixel"
              data-color=${pixel}
              data-row=${rowIndex}
              data-col=${colIndex}
              style="--color: ${GLOBAL_STATE.palette[pixel].hex}"></div>`
          )}
        </div>`
    )}
  </div>`;
}

function updateHeight(e) {
  console.log(e.target.value);
}

function updateWidth(e) {
  console.log(e.target.value);
}

function updateColor(e) {
  console.log(e.target.value);
}

function updateCurrentColor(e) {
  console.log(e.target.dataset.color);
}

function renderControls(state) {
  return html`<div class="control">
      <label>Dimensions</label>
      <div id="dims">
        <input
          type="number"
          name="height"
          id="height"
          @change=${updateHeight}
          value=${state.bitmap.length} />
        <input
          type="number"
          name="width"
          id="width"
          @change=${updateWidth}
          value=${state.bitmap[0].length} />
      </div>
    </div>
    <div class="control">
      <label>Tools</label>
      <div id="tools">
        <div
          class="tool-select ${state.tool == "brush" ? "selected" : ""}"
          @click=${() => (state.tool = "brush")}>
          <i class="fa-solid fa-paintbrush"></i>
        </div>
        <div
          class="tool-select ${state.tool == "hand" ? "selected" : ""}"
          @click=${() => (state.tool = "hand")}>
          <i class="fa-solid fa-hand"></i>
        </div>
        <div
          class="tool-select ${state.tool == "zoom" ? "selected" : ""}"
          @click=${() => (state.tool = "zoom")}>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
    <!-- <div class="control">
      <label for="color">color</label>
      <input
        type="color"
        name="color"
        id="color"
        @change=${updateColor}
        value=${state.palette[state.color].hex} />
    </div> -->
    <div class="control">
      <label for="palette">Palette</label>
      <div id="palette" class="palette">
        ${state.palette.map(
          (color, index) =>
            html`<div
              class="palette-color"
              @click=${updateCurrentColor}
              data-color=${index}
              style="--color: ${color.hex}"></div>`
        )}
        <div class="add-color"><span>+</span></div>
      </div>
    </div>

    <div class="control">
      <label>Export</label>
      <div id="formats">
        <button>BMP</button>
        <button>JPG</button>
        <button>PNG</button>
      </div>
    </div>`;
}

function view(state) {
  return html`<div class="container">
    <div id="controls">${renderControls(state)}</div>
    <div id="workspace">${renderBitmap(state.bitmap)}</div>
  </div> `;
}

function renderView(state) {
  render(view(state), document.body);
}

function r() {
  renderView(GLOBAL_STATE);
  window.requestAnimationFrame(r);
}

function init() {
  renderView(GLOBAL_STATE);
  let workspace = document.getElementById("workspace");
  let palette = document.getElementById("palette");

  // const panZoom = addPanZoom(workspace, GLOBAL_STATE);
  // GLOBAL_STATE.panZoom = panZoom;

  addPixelInteraction(workspace, GLOBAL_STATE);
  addPaletteInteraction(palette, GLOBAL_STATE);

  window.requestAnimationFrame(r);
}

init();
