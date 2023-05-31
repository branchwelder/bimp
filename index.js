import { html, render } from "lit-html";

import { global_state } from "./state";
import { BimpCanvas } from "./BimpCanvas";
import { PixelPalette } from "./palettes/PixelPalette";
import { actions } from "./actions";
import { canvasEvents } from "./canvasEvents";

import { DirectEditor } from "./DirectEditor";

import { brush, flood, rect, line, pan } from "./tools";
import { Save, ToolSelect } from "./Controls";

// import { scale } from "./scale";

import { SplitLayoutManager } from "./layout";

// function syncCanvas(canvas, state) {
//   const active = state[state.activeEditor[0]][state.activeEditor[1]];
//   PixelPalette.eight().render(canvas.getContext("2d"), active.bitmap);
// }

// function renderView(state, dispatch) {
//   render(view(state, dispatch), document.body);
//   const canvas = document.getElementById("main");
//   syncCanvas(canvas, state);
// }

function updateState(state, changes) {
  return { ...state, ...changes };
}

function dispatch(action, args) {
  console.log("dispatch", action);
  // let changes = {};

  // try {
  //   changes = actions[action](state, args);
  // } catch (e) {
  //   console.log(e);
  // }

  // state = updateState(state, changes);
  // renderView(state, dispatch);
}

function editorDispatch(bitmapID, action, args) {
  console.log("dispatch", action);
  let changes = {};

  try {
    changes = actions[action](global_state, args);
  } catch (e) {
    console.log(e);
  }

  global_state = updateState(global_state, changes);
  // renderView(state, dispatch);
}

const tools = {
  brush,
  flood,
  rect,
  line,
  pan,
};

let controls = [Save, ToolSelect];

function sidebarUI(state) {
  return Object.entries(state.bitmaps).map(
    ([id, val]) => html`<div
      class="sidebar-option"
      draggable="true"
      @dragstart=${(e) => layoutManager.attachPaneDropData(e, id)}>
      ${id}
    </div>`
  );
}

function emptyPane(paneID) {
  return html`<span class="empty">${paneID} is empty!</span>`;
}

function bitmapUI(paneID, bitmapID, pane, updateBitmap) {
  const bitmapState = global_state.bitmaps[bitmapID];
  const editorID = `${paneID}-${bitmapID}`;

  const editor = new DirectEditor(
    editorID,
    bitmapState,
    { dispatch, tools, controls },
    pane
  );

  // const bimpCanvas = new BimpCanvas({
  //   bitmap: bitmapState.bitmap,
  //   scale: bitmapState.scale,
  //   palette: PixelPalette.eight(),
  // });

  // const onDown = (pos) => {
  //   let tool = tools[bitmapState.tool];
  //   let toolMove = tool(pos, bitmapState, updateBitmap);
  //   if (toolMove) return (pos) => toolMove(pos, bitmapState);
  // };

  // const editorPane = pane.appendChild(document.createElement("div"));
  // editorPane.classList.add("editor-pane");
  // editorPane.appendChild(bimpCanvas.dom);

  // canvasEvents(bimpCanvas.dom, bitmapState, onDown);
  // bimpCanvas.dom.id = `${paneID}-${bitmapID}`;
  // bimpCanvas.dom.onwheel = (e) => scale(e, bitmapState, updateBitmap);

  // const center = () => {
  //   const parentBounds = editorPane.getBoundingClientRect();
  //   const scale = Math.floor(
  //     Math.min(
  //       (parentBounds.height / bitmapState.bitmap.height) * 0.9,
  //       (parentBounds.width / bitmapState.bitmap.width) * 0.9
  //     )
  //   );
  //   bimpCanvas.syncState({
  //     bitmap: bitmapState.bitmap,
  //     scale: scale,
  //     pan: bitmapState.pan,
  //   });
  // };

  // center();
}

// render app skeleton
render(
  html`<div id="sidebar"></div>
    <div id="layout-container"></div>`,
  document.body
);

const parentNode = document.getElementById("layout-container");
const sidebar = document.getElementById("sidebar");

// Make the layout manager
const layoutManager = new SplitLayoutManager(
  global_state.layout,
  parentNode,
  syncLayout
);

function syncLayout() {
  // Iterate through the key-value pairs in the pane map
  Object.entries(layoutManager.paneMap).forEach(([paneID, bitmapID]) => {
    // Get the DOM node for the pane using the pane ID
    const pane = document.getElementById(paneID);

    const updateBitmap = (action, args) =>
      editorDispatch(bitmapID, action, args);

    // If the paneData is empty render empty pane UI. Otherwise render a
    // pane UI based on whatever data is currently in the pane.
    if (bitmapID == "empty") {
      render(emptyPane(paneID), pane);
    } else {
      bitmapUI(paneID, bitmapID, pane, updateBitmap);
    }
  });

  // Render the options array as well, just so the previews update. may not
  // be necessary depending on what you're doing
  render(sidebarUI(global_state), sidebar);
}

syncLayout();

// window.onload = (e) => init(global_state);

// function init(state) {
//   function dispatch(action, args) {
//     let changes = {};

//     try {
//       changes = actions[action](state, args);
//     } catch (e) {
//       console.log(e);
//     }

//     state = updateState(state, changes);
//     renderView(state, dispatch);
//   }

// Tools functions return a move handler that is fed
// the current canvas / pixel coordinates
// const onDown = (pos) => {
//   const { component, componentSet, componentID } = getActive(state);
//   let tool = tools[component.tool];

//   let toolMove = tool(pos, state, dispatch);
//   if (toolMove) return (pos) => toolMove(pos, state);
// };

// renderView(state, dispatch);
// const workspace = document.getElementById("view-pane");

// canvasEvents(document.getElementById("main"), state, onDown);

// addPanZoom(workspace, dispatch);
// dispatch("center");
// }
