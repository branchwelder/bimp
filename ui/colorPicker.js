import { html } from "lit-html";

function colorInputSlider(current, index, onInput) {
  let start = [...current];
  let end = [...current];

  start[index] = 0;
  end[index] = 255;

  return html`<label class="color-slider-label">
    <span>
      <i class="fa-solid fa-r fa-1x"></i>
    </span>
    <input
      class="color-slider"
      type="range"
      min="0"
      max="255"
      step="1"
      data-index=${index}
      draggable="false"
      @input=${onInput}
      value=${current[index]}
      style="--stops: rgb(${start[0]} ${start[1]} ${start[2]}), rgb(${end[0]} ${end[1]} ${end[2]});" />
  </label>`;
}

export function rgbColorPicker([r, g, b], onInput) {
  return html`<div
    tabindex="0"
    draggable="false"
    class="color-picker"
    style="--r: ${r}; --g: ${g}; --b: ${b};">
    <div
      class="color-preview"
      style="--color-preview: rgb(${r} ${g} ${b}); font-size: 2rem;"></div>
    ${[r, g, b].map((color, index) =>
      colorInputSlider([r, g, b], index, onInput)
    )}
  </div>`;
}
