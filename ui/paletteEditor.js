import { html } from "lit-html";
import { rgbColorPicker } from "./colorPicker";

export function colorPalette(state, dispatch) {
  return html`<div class="palette">
    ${state.layers[state.activeLayer].palette.entries.map(
      (color, paletteIndex) => {
        const active = state.layers[state.activeLayer];
        const [r, g, b] = active.palette.entries[paletteIndex];

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
      }
    )}
  </div>`;
}
