import { html } from "lit-html";

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
    </div>
    <div id="editor"></div>`;
}
