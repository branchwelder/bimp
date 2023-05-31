import { html, render } from "lit-html";
import { BimpCanvas } from "./BimpCanvas";

// export function toolSelect(state, { tools, dispatch }) {
//   return Object.keys(tools).map((toolName) => html`<div>${toolName}</div>`);
// }

// export function controls(state, { controls, dispatch }) {
//   return html`<div id="tool-select">
//     ${Object.keys(controls).map((control) => html`<div>${control}</div>`)}
//   </div>`;
// }

export function palette(state, onChange) {
  // return state.palette.entries.map((entry, paletteIndex) => {
  //   const [r, g, b] = entry;
  //   return html`<div
  //     class="palette-color ${paletteIndex === state.currentPaletteIndex
  //       ? "active-color"
  //       : ""}">
  //     ${(r, g, b)}
  //   </div>`;
  // });        ${state.palette.select(index, onChange)}
  console.log(state.palette);

  return state.palette.entries.map(
    (entry, index) =>
      html`<div
        class="palette-entry ${state.currentPaletteIndex == index
          ? "selected"
          : ""}"></div>`
  );
}

export class Save {
  constructor(state) {
    this.bitmap = state.bitmap;
    this.palette = state.palette;
    this.dom = document.createElement("button");
    this.dom.innerText = "Save";
    this.dom.onclick = () => this.save();
  }

  save() {
    let canvas = new BimpCanvas({
      bitmap: this.bitmap,
      palette: this.palette,
      pixelScale: 1,
    });
    canvas.renderBitmap();

    let link = document.createElement("a");
    link.href = canvas.dom.toDataURL();
    link.download = "bitmap.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  syncState(state) {
    this.bitmap = state.bitmap;
    this.palette = state.palette;
  }
}

export class ToolSelect {
  constructor(state, { tools, dispatch }) {
    this.select = document.createElement("select");
    this.select.onchange = () => dispatch({ currentTool: this.select.value });

    Object.keys(tools).forEach((tool) => {
      const option = document.createElement("option");
      option.selected = tool == state.currentTool;
      option.innerText = tool;
      this.select.appendChild(option);
    });

    this.dom = document.createElement("label");
    this.dom.appendChild(this.select);
  }
  syncState(state) {
    this.select.value = state.currentTool;
  }
}

// export function exportButtons(state, dispatch) {
//   return html`<div id="export">
//     <div class="control-header">
//       <span>Export</span>
//     </div>
//     <div class="flex-buttons">
//       <button @click=${() => dispatch("download", "txt")}>TXT</button>
//       <button @click=${() => dispatch("download", "jpg")}>JPG</button>
//       <button @click=${() => dispatch("download", "png")}>PNG</button>
//       <button @click=${() => dispatch("download", "bmp")}>BMP</button>
//       <button @click=${() => dispatch("download", "json")}>JSON</button>
//     </div>
//   </div>`;
// }
