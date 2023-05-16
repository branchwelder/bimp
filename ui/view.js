import { html } from "lit-html";
import { components } from "./components";
import { bimpEditorView } from "./bimpEditorView";
import { directEditor } from "./directEditor";
import { imageView } from "./imageView";

function choosePane(state, dispatch) {
  const currentTargetType = state.layers[state.activeLayer].type;

  if (currentTargetType === "direct") {
    return directEditor(state, dispatch);
  } else if (currentTargetType === "code") {
    return bimpEditorView(state, dispatch);
  } else if (currentTargetType === "image") {
    return imageView(state, dispatch);
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
  </div> `;
}
