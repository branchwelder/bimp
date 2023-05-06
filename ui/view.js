import { html } from "lit-html";
import { controlPanel } from "./controlPanel";

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
    </div>
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
    </div>
  </div> `;
}
