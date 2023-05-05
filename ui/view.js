import { html } from "lit-html";
import { controlPanel } from "./controlPanel";

export function view(state, dispatch) {
  return html`<div class="container">
    <div id="controls">${controlPanel(state, dispatch)}</div>
    <div id="workspace">
      <canvas id="canvas" class="transform-group"></canvas>
    </div>
  </div> `;
}
