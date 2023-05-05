import { html } from "lit-html";

export function rgbaColorPicker({ r, g, b, a }, onInput) {
  return html`<div
    tabindex="0"
    draggable="false"
    class="color-picker"
    style="--r: ${r}; --g: ${g}; --b: ${b}; --a: ${a};">
    <div
      class="color-preview"
      style="--color-preview: rgb(${r * 100}% ${g * 100}% ${b *
      100}% / ${a}); font-size: 2rem;"></div>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-r fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        data-component="r"
        draggable="false"
        @input=${onInput}
        value=${r}
        style="--stops: rgb(0% ${g * 100}% ${b * 100}% / ${a}), rgb(100% ${g *
        100}% ${b * 100}% / ${a});" />
    </label>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-g fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        data-component="g"
        draggable="false"
        @input=${onInput}
        value=${g}
        style="--stops: rgb(${r * 100}% 0% ${b * 100}% / ${a}), rgb(${r *
        100}% 100% ${b * 100}% / ${a});" />
    </label>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-b fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        data-component="b"
        @input=${onInput}
        value=${b}
        style="--stops: rgb(${r * 100}% ${g * 100}% 0% / ${a}), rgb(${r *
        100}% ${g * 100}% 100% / ${a});" />
    </label>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-a fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        @input=${onInput}
        data-component="a"
        value=${a}
        style="--stops: rgb(${r * 100}% ${g * 100}% ${b * 100}% / 0), rgb(${r *
        100}% ${g * 100}% ${b * 100}% / 1);" />
    </label>
  </div>`;
}
