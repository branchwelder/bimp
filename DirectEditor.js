import { BimpCanvas } from "./BimpCanvas";
// import { BimpCanvasOverlay } from "./BimpCanvasOverlay";
import { html, render } from "lit-html";
import { palette } from "./Controls";

import { scale, beginPan } from "./editorEvents";

const defaultEvents = { onwheel: scale, onpointerdown: beginPan };

export class DirectEditor {
  constructor(id, state, config, parentNode) {
    let { dispatch, tools, events, controls } = config;
    this.parentNode = parentNode;
    this.state = state;
    this.id = id;

    // One-time direct change to the state to center the initial art...
    this.state.pixelScale = this.center();

    this.canvas = new BimpCanvas(state);
    this.controls = controls.map((Control) => new Control(state, config));
    // this.palette = PixelPalette.eight();

    // this.overlay = new BimpCanvasOverlay(
    //   this.state,
    //   ({ x, y }) => {
    //     if (
    //       x < 0 ||
    //       y < 0 ||
    //       x >= this.state.bitmap.width ||
    //       y >= this.state.bitmap.height
    //     ) {
    //       dispatch({ mouseCoords: null });
    //     }
    //     dispatch({ mouseCoords: [x, y] });
    //   },
    //   (pos) => {
    //     let tool = tools[this.state.currentTool];
    //     let onMove = tool(pos, this.state, dispatch);
    //     if (onMove) return (pos) => onMove(pos, this.state);
    //   }
    // );

    this.dom = this.buildDom();

    // for (const [eventName, handler] of Object.entries(
    //   events ?? defaultEvents
    // )) {
    //   this.dom[eventName] = (e) => handler(e, this.state, dispatch);
    // }

    this.dom.onwheel = (e) => scale(e, this.state, dispatch);
    this.dom.onpointerdown = (e) => beginPan(e, this.state, dispatch);

    this.parentNode.appendChild(this.dom);

    const paletteContainer = this.dom.appendChild(
      document.createElement("div")
    );

    render(
      palette(state, (index) => dispatch({ currentPaletteIndex: index })),
      paletteContainer
    );
  }

  center() {
    const parentBounds = this.parentNode.getBoundingClientRect();
    const pixelScale = Math.floor(
      Math.min(
        (parentBounds.height / this.state.bitmap.height) * 0.9,
        (parentBounds.width / this.state.bitmap.width) * 0.9
      )
    );
    return pixelScale;
  }

  // view(state, dispatch) {
  //   return html`<div id="app-container">
  //     <div id="tools-container"></div>
  //     <div id="palette-container"></div>
  //     <div id="canvas-container"></div>
  //   </div>`;
  // }

  buildDom() {
    const appContainer = document.createElement("div");
    appContainer.id = this.id;

    const canvasContainer = document.createElement("div");
    canvasContainer.id = `${this.id}-canvas-container`;

    canvasContainer.appendChild(this.canvas.dom);
    // canvasContainer.appendChild(this.overlay.dom);

    const toolsContainer = document.createElement("div");
    toolsContainer.id = `${this.id}-tools-container`;

    const controlsContainer = document.createElement("div");
    controlsContainer.id = `${this.id}-controls-container`;
    this.controls.forEach((control) => {
      controlsContainer.appendChild(control.dom);
    });

    // const palette = document.createElement("div");
    // palette.id = `${this.id}-palette-container`;

    appContainer.appendChild(toolsContainer);
    appContainer.appendChild(controlsContainer);
    // appContainer.appendChild(palette);
    appContainer.appendChild(canvasContainer);

    return appContainer;
  }

  syncState(state) {
    // Perform any updates that should occur when the state is updated.

    // Assign the new state
    this.state = state;

    // Re-draw the bitmap
    this.canvas.syncState(state);
    this.overlay.syncState(state);
    this.controls.forEach((control) => control.syncState(state));
    // this.palette.syncState(state);
  }
}
