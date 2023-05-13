import { html } from "lit-html";

function sizeControls(state, dispatch) {
  const current = state.layers[state.activeLayer].bitmap;
  const width = current.width,
    height = current.height;
  return html`<div id="size">
    <div
      class="input-spinner"
      @click=${() =>
        dispatch("resizeTarget", [width - 1, height], () =>
          dispatch("centerCanvas")
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
        dispatch("resizeTarget", [Number(e.target.value), height], () =>
          dispatch("centerCanvas")
        )}
      value=${width} />
    <div
      class="input-spinner"
      @click=${() =>
        dispatch("resizeTarget", [width + 1, height], () =>
          dispatch("centerCanvas")
        )}>
      <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
    </div>
    <span>by</span>
    <div
      class="input-spinner"
      @click=${() =>
        dispatch("resizeTarget", [width, height - 1], () =>
          dispatch("centerCanvas")
        )}>
      <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
    </div>
    <input
      type="text"
      inputmode="numeric"
      min="1"
      step="1"
      @change=${(e) =>
        dispatch("resizeTarget", [width, Number(e.target.value)], () =>
          dispatch("centerCanvas")
        )}
      value=${height} />
    <div
      class="input-spinner"
      @click=${() =>
        dispatch("resizeTarget", [width, height + 1], () =>
          dispatch("centerCanvas")
        )}>
      <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
    </div>
  </div>`;
}

function toolbar(state, dispatch) {
  return html`<div id="toolbar">
    <div class="tool-group">
      ${sizeControls(state, dispatch)}
      <div
        class="tool-select ${state.activeTool == "brush"
          ? "selected"
          : "not-selected"}"
        @click=${() => dispatch("setActiveTool", "brush")}>
        <i class="fa-solid fa-paintbrush"></i>
      </div>
      <div
        class="tool-select ${state.activeTool == "flood"
          ? "selected"
          : "not-selected"}"
        @click=${() => dispatch("setActiveTool", "flood")}>
        <i class="fa-solid fa-fill-drip"></i>
      </div>
      <div
        class="tool-select ${state.activeTool == "move"
          ? "selected"
          : "not-selected"}"
        @click=${() => dispatch("setActiveTool", "move")}>
        <i class="fa-solid fa-up-down-left-right"></i>
      </div>
    </div>
  </div>`;
}

export function directEditor(state, dispatch) {
  return toolbar(state, dispatch);
}
