import { html } from "lit-html";
import { rgbColorPicker } from "./colorPicker";

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

function palette(state, dispatch) {
  return html` <div>
    <div class="control-header">
      <span>Palette</span>
      <!-- <span
        class="header-action"
        @click=${() => dispatch("addColor", { r: 1, g: 1, b: 1, a: 1 })}>
        <i class="fa-solid fa-plus"></i>
      </span> -->
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

export function leftPane(state, dispatch) {
  return html`${palette(state, dispatch)} ${controlButtons(state, dispatch)}
    <!-- ${exportButtons(state, dispatch)} -->`;
}
