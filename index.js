import { render, html, nothing } from "lit-html";
import { addPanZoom } from "./addPanZoom";
import { addPixelInteraction } from "./addPixelInteraction";
import { colorPicker } from "./colorPicker";

let testBitmap = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let palette = [
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
  bitmap: testBitmap,
  palette: palette,
  panZoom: null,
  tool: "brush", // tool can be move, brush, flood
  activeColor: 0, // palette index of the currently active color

  setColor: function (row, col) {
    this.bitmap[row][col] = this.activeColor;
  },

  flood: function (sr, sc, paletteIndex) {
    // Condition for checking out of bounds
    if (
      sr < 0 ||
      sr >= this.bitmap.length ||
      sc < 0 ||
      sc >= this.bitmap[0].length
    )
      return;

    if (this.bitmap[sr][sc] != paletteIndex) return;

    if (this.bitmap[sr][sc] == this.activeColor) return;

    this.bitmap[sr][sc] = this.activeColor;
    this.flood(sr - 1, sc, paletteIndex); // left
    this.flood(sr + 1, sc, paletteIndex); // right
    this.flood(sr, sc + 1, paletteIndex); // top
    this.flood(sr, sc - 1, paletteIndex); // bottom
  },
};

function renderBitmap(state) {
  return html`<div
    id="bitmap-container"
    class="transform-group unselectable"
    style="grid-template-columns: repeat(${state.bitmap[0]
      .length}, 1fr); grid-template-rows: repeat(${state.bitmap.length}, 1fr)">
    ${state.bitmap.map((row, rowIndex) =>
      row.map((paletteIndex, colIndex) => {
        let pData = state.palette[paletteIndex];
        return html`<div
          class="pixel"
          data-color=${paletteIndex}
          data-row=${rowIndex}
          data-col=${colIndex}
          style="--r: ${pData.r}; --g: ${pData.g}; --b: ${pData.b}; --a: ${pData.a}"></div>`;
      })
    )}
  </div>`;
}

function updateHeight(state, newHeight) {
  const heightDiff = Number(newHeight) - state.bitmap.length;

  if (Math.sign(heightDiff) === -1) {
    // remove rows
    state.bitmap.splice(heightDiff);
  } else if (Math.sign(heightDiff) === 1) {
    // create rows of transparent and add them

    state.bitmap = state.bitmap.concat(
      Array.from(Array(heightDiff), (_) =>
        Array(state.bitmap[0].length).fill(0)
      )
    );
  }
}

function updateWidth(state, newWidth) {
  const widthDiff = Number(newWidth) - state.bitmap[0].length;

  if (Math.sign(widthDiff) === -1) {
    // remove cols
    state.bitmap.forEach((row) => row.splice(widthDiff));
  } else if (Math.sign(widthDiff) === 1) {
    // create cols of transparent and add them
    let cols = new Array(widthDiff).fill(0);
    state.bitmap.forEach((row) => row.push(...cols));
  }
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
  return html`<div id="app-title">bitmap editor</div>
    <div class="control">
      <div class="control-header">
        <span>Size</span>
      </div>
      <div id="size">
        <div
          class="input-spinner"
          @click=${() => updateWidth(state, state.bitmap[0].length - 1)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          id="width"
          @change=${(e) => updateWidth(state, e.target.value)}
          value=${state.bitmap[0].length} />
        <div
          class="input-spinner"
          @click=${() => updateWidth(state, state.bitmap[0].length + 1)}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
        <span>by</span>
        <div
          class="input-spinner"
          @click=${() => updateHeight(state, state.bitmap.length - 1)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          @change=${(e) => updateHeight(state, e.target.value)}
          value=${state.bitmap.length} />
        <div
          class="input-spinner"
          @click=${() => updateHeight(state, state.bitmap.length + 1)}>
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
          class="tool-select ${state.tool == "brush" ? "selected" : ""}"
          @click=${() => (state.tool = "brush")}>
          <i class="fa-solid fa-paintbrush"></i>
        </div>
        <div
          class="tool-select ${state.tool == "move" ? "selected" : ""}"
          @click=${() => (state.tool = "move")}>
          <i class="fa-solid fa-up-down-left-right"></i>
        </div>
        <div
          class="tool-select ${state.tool == "flood" ? "selected" : ""}"
          @click=${() => (state.tool = "flood")}>
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

function view(state) {
  return html`<div class="container">
    <div id="controls">${renderControls(state)}</div>
    <div id="workspace">${renderBitmap(state)}</div>
  </div> `;
}

function renderView(state) {
  render(view(state), document.body);
}

function r() {
  renderView(GLOBAL_STATE);
  window.requestAnimationFrame(r);
}

function centerArt() {
  let art = document.getElementById("bitmap-container");
  const bb = art.getBoundingClientRect();
  GLOBAL_STATE.panZoom.setScaleXY({
    x: [bb.left, bb.right],
    y: [bb.top, bb.bottom],
  });
}

function init() {
  renderView(GLOBAL_STATE);
  let workspace = document.getElementById("workspace");

  const panZoom = addPanZoom(workspace, GLOBAL_STATE);
  GLOBAL_STATE.panZoom = panZoom;

  addPixelInteraction(workspace, GLOBAL_STATE);
  centerArt();
  window.requestAnimationFrame(r);
}

init();
