import { render, html } from "lit-html";
import { addPanZoom } from "./addPanZoom";
import { addPixelInteraction } from "./addPixelInteraction";

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
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];

let palette = [
  { r: 0, g: 0, b: 0, a: 0 },
  { r: 71, g: 125, b: 188, a: 0.5 },
  { r: 71, g: 0, b: 188, a: 1 },
  { r: 71, g: 255, b: 188, a: 1 },
];

const GLOBAL_STATE = {
  bitmap: testBitmap,
  palette: palette,
  currentColors: [0, 1],
  pageBackground: "#ffffff",
  panZoom: null,
  tool: "brush", // tool can be move, brush, zoom
  setColor: function (row, col, color) {
    this.bitmap[row][col] = color;
  },
  setCurrentColor: function (newColor) {
    this.color = newColor;
  },
};

function renderBitmap(bitmap) {
  return html`<div
    id="artwork"
    style="--page-background: ${GLOBAL_STATE.pageBackground}"
    class="transform-group unselectable"
    draggable="false">
    ${bitmap.map(
      (row, rowIndex) =>
        html`<div class="row" draggable="false">
          ${row.map((pixel, colIndex) => {
            let pData = GLOBAL_STATE.palette[pixel];
            return html`<div
              class="pixel"
              draggable="false"
              data-color=${pixel}
              data-row=${rowIndex}
              data-col=${colIndex}
              style="--r: ${pData.r}; --g: ${pData.g}; --b: ${pData.b}; --a: ${pData.a}"></div>`;
          })}
        </div>`
    )}
  </div>`;
}

function updateHeight(newHeight) {
  const heightDiff = Number(newHeight) - GLOBAL_STATE.bitmap.length;

  if (Math.sign(heightDiff) === -1) {
    // remove rows
    GLOBAL_STATE.bitmap.splice(heightDiff);
  } else if (Math.sign(heightDiff) === 1) {
    // create rows of transparent and add them

    GLOBAL_STATE.bitmap = GLOBAL_STATE.bitmap.concat(
      Array.from(Array(heightDiff), (_) =>
        Array(GLOBAL_STATE.bitmap[0].length).fill(0)
      )
    );
  }
}

function updateWidth(newWidth) {
  const widthDiff = Number(newWidth) - GLOBAL_STATE.bitmap[0].length;

  if (Math.sign(widthDiff) === -1) {
    // remove cols
    GLOBAL_STATE.bitmap.forEach((row) => row.splice(widthDiff));
  } else if (Math.sign(widthDiff) === 1) {
    // create cols of transparent and add them
    let cols = new Array(widthDiff).fill(0);
    GLOBAL_STATE.bitmap.forEach((row) => row.push(...cols));
  }
}

function updateCurrentColor(e) {
  let colorData = e.target.dataset;

  if (e.button == 0) {
    GLOBAL_STATE.currentColors[0] = Number(colorData.color);
  } else if (e.button == 2) {
    GLOBAL_STATE.currentColors[1] = Number(colorData.color);
  }
}

function swapPrimarySecondary(e) {
  GLOBAL_STATE.currentColors.reverse();
}

function addColor(e) {
  GLOBAL_STATE.palette.push({ hex: e.target.value });
}

function removeColor(paletteIndex) {
  console.log(paletteIndex);
}

function editColor(e, index) {
  GLOBAL_STATE.palette[index].hex = e.target.value;
}

function renderControls(state) {
  return html`<div id="app-title">bitmap editor</div>
    <div class="control">
      <label>Size</label>
      <div id="size">
        <div
          class="input-spinner"
          @click=${() => updateWidth(state.bitmap[0].length - 1)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          id="width"
          @change=${(e) => updateWidth(e.target.value)}
          value=${state.bitmap[0].length} />
        <div
          class="input-spinner"
          @click=${() => updateWidth(state.bitmap[0].length + 1)}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
        <span>by</span>
        <div
          class="input-spinner"
          @click=${() => updateHeight(state.bitmap.length - 1)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          @change=${(e) => updateHeight(e.target.value)}
          value=${state.bitmap.length} />
        <div
          class="input-spinner"
          @click=${() => updateHeight(state.bitmap.length + 1)}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
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
          class="tool-select ${state.tool == "move" ? "selected" : ""}"
          @click=${() => (state.tool = "move")}>
          <i class="fa-solid fa-up-down-left-right"></i>
        </div>
        <div
          class="tool-select ${state.tool == "zoom" ? "selected" : ""}"
          @click=${() => (state.tool = "zoom")}>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
    <div class="control">
      <label for="palette">Palette</label>
      <div id="palette" class="palette">
        ${state.palette.map(
          (color, index) =>
            html`<div
              class="palette-color"
              data-color=${index}
              style="--r: ${color.r}; --g: ${color.g}; --b: ${color.b}; --a: ${color.a}"
              @mousedown=${updateCurrentColor}
              @contextmenu=${(e) => e.preventDefault()}>
              <span class="remove-color" @click=${() => removeColor(index)}>
                <i class="fa-solid fa-x fa-2xs"></i>
              </span>
              <span class="edit-color">
                <i class="fa-solid fa-pen fa-fw fa-2xs"></i>
              </span>
              <!-- <input
                  type="color"
                  class="color-picker"
                  @change=${(e) => editColor(e, index)} /> -->
              <!-- </div> -->
            </div>`
        )}
        <div id="add-color">
          <i class="fa-solid fa-plus"> </i>
          <div class="color-popup">
            <input type="color" class="color-picker" @change=${addColor} />
          </div>
        </div>
      </div>
    </div>
    <div class="control">
      <label>Export</label>
      <div id="formats">
        <button>BMP</button>
        <button>JPG</button>
        <button>PNG</button>
      </div>
    </div>
    <!-- <div>${JSON.stringify(state.palette)}</div>
    <div>${JSON.stringify(state.currentColors)}</div> --> `;
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

function centerArt() {
  let art = document.getElementById("artwork");
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
