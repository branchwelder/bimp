const trigger = (e) => e.composedPath()[0];
const matchesTrigger = (e, selectorString) =>
  trigger(e).matches(selectorString);

export const createListener =
  (target) => (eventName, selectorString, event, args) => {
    target.addEventListener(
      eventName,
      (e) => {
        e.trigger = trigger(e);
        if (selectorString === "" || matchesTrigger(e, selectorString))
          event(e);
      },
      args ?? {}
    );
  };

export function getActive(state) {
  return {
    component: { ...state[state.activeEditor[0]][state.activeEditor[1]] },
    componentSet: state.activeEditor[0],
    componentID: state.activeEditor[1],
  };
}
