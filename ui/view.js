import { html } from "lit-html";
import { components } from "./components";
import { directEditor } from "./directEditor";
import { colorPalette } from "./paletteEditor";

function choosePane(state, dispatch) {
  const currentTargetType = state.layers[state.activeLayer].type;

  if (currentTargetType === "direct") {
    return directEditor(state, dispatch);
  } else if (currentTargetType === "code") {
    return html`<div id="editor"></div>`;
  }
}

export function view(state, dispatch) {
  return html`<div class="global-container">
    <div id="components">${components(state, dispatch)}</div>
    <div id="workspace">
      <div id="canvas-container">
        <canvas id="canvas" class="transform-group"></canvas>
      </div>
      ${choosePane(state, dispatch)}
    </div>
    <div id="right-pane">
      <div class="control-header">Center</div>
      <div class="flex-buttons">
        <button @click=${() => dispatch("centerCanvas")}>
          <i class="fa-solid fa-arrows-to-dot fa-fw"></i>
        </button>
      </div>
      <div class="control-header">Palette</div>

      ${colorPalette(state, dispatch)}
      <div id="export">
        <div class="control-header">Export</div>
        <div class="flex-buttons">
          <button @click=${() => dispatch("download", "txt")}>TXT</button>
          <button @click=${() => dispatch("download", "jpg")}>JPG</button>
          <button @click=${() => dispatch("download", "png")}>PNG</button>
          <button @click=${() => dispatch("download", "bmp")}>BMP</button>
          <button @click=${() => dispatch("download", "json")}>JSON</button>
        </div>
      </div>
    </div>
  </div> `;
}
