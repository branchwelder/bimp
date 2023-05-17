import { html } from "lit-html";
import { exportButtons } from "./exportButtons";

export function bimpEditorView(state, dispatch) {
  return html`<div id="toolbar">
      <div class="tool-group">
        <div
          class="tool-select ${state.activeTool == "move"
            ? "selected"
            : "not-selected"}"
          @click=${() => dispatch("setActiveTool", "move")}>
          <i class="fa-solid fa-up-down-left-right"></i>
        </div>
      </div>
      ${exportButtons(state, dispatch)}
    </div>
    <div id="editor"></div>`;
}
