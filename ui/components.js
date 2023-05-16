import { html } from "lit-html";

function layers(state, dispatch) {
  return html`<div>
      <div class="control-header">
        <span>Bitmaps</span>
      </div>
    </div>
    ${state.layers.map(
      (layer, index) => html` <div
        class="layer ${state.activeLayer === index ? "selected" : "unselected"}"
        @click=${() => dispatch("setActiveLayer", index)}>
        <span>${index}</span>
        <div class="preview-container">
          <canvas data-layerid=${layer.id} class="preview-canvas"></canvas>
        </div>
      </div>`
    )}
    <div class="flex-buttons new-bitmap-buttons">
      <button>
        <label for="imgUpload">
          <i class="fa-solid fa-image"></i>
        </label>
        <input
          type="file"
          id="imgUpload"
          style="display:none;"
          @change=${(e) => dispatch("addImageLayer", e)} />
      </button>

      <button @click=${() => dispatch("addDirectLayer")}>
        <i class="fa-solid fa-paintbrush"></i>
      </button>
      <button @click=${() => dispatch("addCodeLayer")}>
        <i class="fa-solid fa-code"></i>
      </button>
    </div>`;
}

function controlButtons(state, dispatch) {
  return html`<div class="flex-buttons">
    <!-- <button @click=${() => dispatch("undo")}>
      <i class="fa-solid fa-rotate-left fa-fw"></i>
    </button> -->
    <button @click=${() => dispatch("centerCanvas")}>
      <i class="fa-solid fa-arrows-to-dot fa-fw"></i>
    </button>
  </div>`;
}

function exportButtons(state, dispatch) {
  return html`<div id="export">
    <div class="control-header">
      <span>Export</span>
    </div>
    <div class="flex-buttons">
      <button @click=${() => dispatch("download", "txt")}>TXT</button>
      <button @click=${() => dispatch("download", "jpg")}>JPG</button>
      <button @click=${() => dispatch("download", "png")}>PNG</button>
      <button @click=${() => dispatch("download", "bmp")}>BMP</button>
      <button @click=${() => dispatch("download", "json")}>JSON</button>
    </div>
  </div>`;
}

export function components(state, dispatch) {
  return html`${controlButtons(state, dispatch)} ${layers(state, dispatch)}
    <!-- ${exportButtons(state, dispatch)} -->`;
}
