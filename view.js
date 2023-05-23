import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

function renderComponents(state, dispatch) {
  return Object.entries(state.bitmaps).map(
    ([id, entry]) => html`<div class="component-preview">${id}</div>`
  );
}

function numberSelect(value, state, onChange) {
  return html`<input type="number" value=${value} @change=${onChange} />`;
}

function paletteSelect(value, state, onChange) {
  // Should render a (dropdown? drag and drop?) that lets you select a palette from the components
  // Should also render a color selection menu
  return html`<label for="palettes"></label>

    <select name="palettes" id="palettes" value=${value}>
      ${Object.keys(state.palettes).map(
        (palette) => html`<option value="${palette}">${palette}</option>`
      )}
    </select>`;
}

const tools = {
  brush: {
    icon: "fa-paintbrush",
    hover: "Brush",
    config: html`<label>size<input type="number" value="10" /></label>`,
  },
  flood: {
    icon: "fa-fill-drip",
    hover: "Flood",
  },
  rect: {
    icon: "fa-vector-square",
    hover: "Rect",
  },
};

function toolSelect(currentTool, dispatch) {
  // Should render radio-selection to choose the active tool
  // Should also render any tool-specific options
  // console.log(currentTool);
  return html`<div class="tool-buttons">
      ${Object.entries(tools).map(
        ([toolName, info]) =>
          html`<div
            @click=${() => dispatch("setActiveTool", { toolName })}
            class=${classMap({
              "tool-select": true,
              selected: currentTool == toolName,
            })}>
            <i class="fa-solid ${info.icon}"></i>
          </div>`
      )}
    </div>
    ${"config" in tools[currentTool]
      ? html`<div id="tool-config">${tools[currentTool].config}</div>`
      : ""}`;
}

function bitmapSelect(value, state, onChange) {
  return html`<input type="number" />`;
}

function center(state, dispatch) {
  return html`<button @click=${() => dispatch({ action: "center" })}>
    center
  </button>`;
}

const paramTypes = {
  number: numberSelect,
  palette: paletteSelect,
  bitmap: bitmapSelect,
};

const controls = [center];

function renderWorkspace(state, dispatch) {
  const active = state[state.activeEditor[0]][state.activeEditor[1]];
  const [x, y] = active.pan;

  return html`<div id="control-pane">
    <div id="controls">${controls.map((ctrl) => ctrl(state, dispatch))}</div>

    <div id="tools">${toolSelect(active.tool, dispatch)}</div>

    <div id="params">

      ${Object.entries(active.params).map(
        ([key, val]) =>
          html` <div>
              ${paramTypes[val.paramType](val.value, state, dispatch)}
            </div>
            <div class="param-name">${key}</div>`
      )}
    </div>
    </div>
    <div id="view-pane">
      <canvas id="main" width="${
        active.bitmap.width * active.scale
      }px" height="${active.bitmap.height * active.scale}px"
      style="transform: translate(${Math.floor(x)}px, ${Math.floor(
    y
  )}px);"></canvas>
    </div>
  </div>`;
}

export function view(state, dispatch) {
  return html`<div id="app-container">
    <div id="components">${renderComponents(state, dispatch)}</div>
    <div id="editor-container">${renderWorkspace(state, dispatch)}</div>
  </div>`;
}
