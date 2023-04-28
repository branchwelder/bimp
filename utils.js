const trigger = (e) => e.composedPath()[0];
const matchesTrigger = (e, selectorString) =>
  trigger(e).matches(selectorString);

export const createListener =
  (target) => (eventName, selectorString, event, args) => {
    // focus doesn't work with this, focus doesn't bubble, need focusin
    target.addEventListener(
      eventName,
      (e) => {
        e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
        if (selectorString === "" || matchesTrigger(e, selectorString))
          event(e);
      },
      args ?? {}
    );
  };
