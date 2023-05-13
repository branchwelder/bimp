import { html } from "lit-html";
import { rgbColorPicker } from "./colorPicker";

function layers(state, dispatch) {
  return html`<div>
    <div class="control-header">
      <span>Bitmaps</span>
      <div class="flex-buttons">
        <button @click=${() => dispatch("addDirectLayer")}>
          <i class="fa-solid fa-paintbrush"></i>
        </button>
        <button @click=${() => dispatch("addCodeLayer")}>
          <i class="fa-solid fa-code"></i>
        </button>
      </div>
    </div>
    ${state.layers.map(
      (layer, index) => html` <div
        class="layer ${state.activeLayer === index ? "selected" : "unselected"}"
        @click=${() => dispatch("setActiveLayer", index)}>
        <span>${index}</span>
        <div class="preview-container">
          <canvas data-layerid=${layer.id} class="preview-canvas"></canvas>
        </div>
      </div>`
    )}
  </div>`;
}

function controlButtons(state, dispatch) {
  return html`<div class="flex-buttons">
    <!-- <button @click=${() => dispatch("undo")}>
      <i class="fa-solid fa-rotate-left fa-fw"></i>
    </button> -->
    <button @click=${() => dispatch("centerCanvas")}>
      <i class="fa-solid fa-arrows-to-dot fa-fw"></i>
    </button>
  </div>`;
}

function palettes(state, dispatch) {
  return html` <div>
    <div class="control-header">
      <span>Palettes</span>
      <!-- <span
        class="header-action"
        @click=${() => dispatch("addColor", { r: 1, g: 1, b: 1, a: 1 })}>
        <i class="fa-solid fa-plus"></i>
      </span> -->
      <div class="flex-buttons">
        <button @click=${() => dispatch("addPalette")}>
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    <div id="palette" class="palette">
      ${state.palette.entries.map((color, paletteIndex) => {
        const [r, g, b] = state.palette.entries[paletteIndex];
        return html`<div
          class="palette-color ${paletteIndex === state.activeColor
            ? "active-color"
            : ""}"
          data-color=${paletteIndex}
          style="--r: ${r}; --g: ${g}; --b: ${b};"
          @click=${() => dispatch("setActiveColor", Number(paletteIndex))}>
          <div class="edit-color-container">
            <a class="edit-button" href="#">
              <i class="fa-solid fa-pen fa-fw fa-2xs"></i>
            </a>
            ${rgbColorPicker([r, g, b], (e) =>
              dispatch("updateColor", {
                paletteIndex,
                index: Number(e.target.dataset.index),
                newVal: e.target.value,
              })
            )}
          </div>
        </div>`;
      })}
    </div>
  </div>`;
}

function exportButtons(state, dispatch) {
  return html`<div id="export">
    <div class="control-header">
      <span>Export</span>
    </div>
    <div class="flex-buttons">
      <button @click=${() => dispatch("download", "txt")}>TXT</button>
      <button @click=${() => dispatch("download", "jpg")}>JPG</button>
      <button @click=${() => dispatch("download", "png")}>PNG</button>
      <button @click=${() => dispatch("download", "bmp")}>BMP</button>
      <button @click=${() => dispatch("download", "json")}>JSON</button>
    </div>
  </div>`;
}

export function components(state, dispatch) {
  return html`${palettes(state, dispatch)} ${controlButtons(state, dispatch)}
    ${layers(state, dispatch)}
    <!-- ${exportButtons(state, dispatch)} -->`;
}
