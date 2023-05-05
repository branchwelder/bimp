import { html, nothing } from "lit-html";
import { rgbaColorPicker } from "./colorPicker";

function controlButtons(state, dispatch) {
  return html`<div class="flex-buttons">
    <button @click=${() => dispatch("undo")}>
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button @click=${() => dispatch("centerCanvas")}>
      <i class="fa-solid fa-arrows-to-dot"></i>
    </button>
  </div>`;
}

function size(state, dispatch) {
  return html`<div>
    <div class="control-header">
      <span>Size</span>
    </div>
    <div id="size">
      <div
        class="input-spinner"
        @click=${() =>
          dispatch(
            "resize",
            [state.bitmap.width - 1, state.bitmap.height],
            () => dispatch("centerCanvas")
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
          dispatch(
            "resize",
            [Number(e.target.value), state.bitmap.height],
            () => dispatch("centerCanvas")
          )}
        value=${state.bitmap.width} />
      <div
        class="input-spinner"
        @click=${() =>
          dispatch(
            "resize",
            [state.bitmap.width + 1, state.bitmap.height],
            () => dispatch("centerCanvas")
          )}>
        <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
      </div>
      <span>by</span>
      <div
        class="input-spinner"
        @click=${() =>
          dispatch(
            "resize",
            [state.bitmap.width, state.bitmap.height - 1],
            () => dispatch("centerCanvas")
          )}>
        <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
      </div>
      <input
        type="text"
        inputmode="numeric"
        min="1"
        step="1"
        @change=${(e) =>
          dispatch("resize", [state.bitmap.width, Number(e.target.value)], () =>
            dispatch("centerCanvas")
          )}
        value=${state.bitmap.height} />
      <div
        class="input-spinner"
        @click=${() =>
          dispatch(
            "resize",
            [state.bitmap.width, state.bitmap.height + 1],
            () => dispatch("centerCanvas")
          )}>
        <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
      </div>
    </div>
  </div>`;
}

function tools(state, dispatch) {
  return html` <div>
    <div class="control-header">
      <span>Tools</span>
    </div>
    <div id="tools">
      <div
        class="tool-select ${state.activeTool == "brush"
          ? "selected"
          : "not-selected"}"
        @click=${() => dispatch("setActiveTool", "brush")}>
        <i class="fa-solid fa-paintbrush"></i>
      </div>
      <div
        class="tool-select ${state.activeTool == "move"
          ? "selected"
          : "not-selected"}"
        @click=${() => dispatch("setActiveTool", "move")}>
        <i class="fa-solid fa-up-down-left-right"></i>
      </div>
      <div
        class="tool-select ${state.activeTool == "flood"
          ? "selected"
          : "not-selected"}"
        @click=${() => dispatch("setActiveTool", "flood")}>
        <i class="fa-solid fa-fill-drip"></i>
      </div>
    </div>
  </div>`;
}

function palette(state, dispatch) {
  return html` <div>
    <div class="control-header">
      <span>Palette</span>
      <span
        class="add-color"
        @click=${() => dispatch("addColor", { r: 1, g: 1, b: 1, a: 1 })}>
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
            @click=${() => dispatch("setActiveColor", Number(paletteIndex))}>
            ${paletteIndex === 0
              ? nothing
              : html`<div class="edit-color-container">
                  <a class="edit-button" href="#">
                    <i class="fa-solid fa-pen fa-fw fa-2xs"></i>
                  </a>
                  ${rgbaColorPicker(state.palette[paletteIndex], (e) =>
                    dispatch("updateColor", {
                      paletteIndex,
                      component: e.target.dataset.component,
                      newVal: e.target.value,
                    })
                  )}
                </div>`}
          </div>`
      )}
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

export function controlPanel(state, dispatch) {
  return html`${controlButtons(state, dispatch)} ${size(state, dispatch)}
  ${tools(state, dispatch)} ${palette(state, dispatch)}
  ${exportButtons(state, dispatch)}`;
}
