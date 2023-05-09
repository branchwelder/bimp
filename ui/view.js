import { html } from "lit-html";
import { controlPanel } from "./controlPanel";
import { bitmapToCanvas, isEditorTarget } from "../utils";

function toolbar(state, dispatch) {
  return html`<div id="toolbar">
    <div id="tool-group">
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
      <div
        class="tool-select ${state.activeTool == "code"
          ? "selected"
          : "not-selected"}"
        @click=${() => dispatch("setActiveTool", "code")}>
        <i class="fa-solid fa-code"></i>
      </div>
    </div>
  </div>`;
}

function layers(state, dispatch) {
  return html`
    <div id="layers">
      ${state.layers.map(
        (layer, index) => html`<div
          class="layer ${isEditorTarget(state.editorTarget, "layers", index)
            ? "selected"
            : "unselected"}"
          @click=${() => dispatch("setEditorTarget", ["layers", index])}>
          <span>${index}</span>
          <img
            class="pixelated"
            src=${bitmapToCanvas(layer, state.palette).toDataURL()} />
        </div>`
      )}
      <button @click=${() => dispatch("addLayer")}>new layer</button>
    </div>

    <!-- <div id="preview">
      <img
        class="pixelated"
        src=${bitmapToCanvas(state.bitmap, state.palette).toDataURL()} />
    </div> -->
  </div>`;
}

function editor(state, dispatch) {
  return html`<div id="editor">
    <!-- <div id="editor-title">Editor</div> -->
    <div id="editor-container"></div>
  </div>`;
}

export function view(state, dispatch) {
  return html`<div class="container">
    <div id="controls">${controlPanel(state, dispatch)}</div>
    <div id="workspace-container">
      ${toolbar(state, dispatch)}
      <div id="workspace">
        <canvas id="canvas" class="transform-group"></canvas>
      </div>
      ${editor(state, dispatch)}
    </div>
    <div id="right-pane">${layers(state, dispatch)}</div>
  </div> `;
}
