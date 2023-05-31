import { getActive } from "./utils";

export const actions = {
  center,
  setActiveTool,
};

function updateNested(state, prop0, prop1, val) {
  return { ...state, [prop0]: { ...state[prop0], [prop1]: val } };
}

function center(state, bitmapID) {
  // Computes the pixel scale for the active editor
  // const { component, componentSet, componentID } = getActive(state);

  const canvas = document.getElementById(bitmapID);
  const parentBounds = canvas.parentNode.getBoundingClientRect();

  const scale = Math.floor(
    Math.min(
      (parentBounds.height / component.bitmap.height) * 0.9,
      (parentBounds.width / component.bitmap.width) * 0.9
    )
  );
  component.scale = scale;

  return {
    [componentSet]: {
      ...state[componentSet],
      [componentID]: component,
    },
  };
}

function setActiveTool(state, { toolName }) {
  const { component, componentSet, componentID } = getActive(state);

  component.tool = toolName;

  return {
    [componentSet]: {
      ...state[componentSet],
      [componentID]: component,
    },
  };
}
