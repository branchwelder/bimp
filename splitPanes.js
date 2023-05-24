export class Pane {
  constructor(id) {
    this.id = id ?? uuidv4();
    this.children = [];
  }

  buildDom() {}

  addChild() {
    console.log("adding a child");
  }

  removeChild() {
    console.log("removing a child");
  }
}

export class Layout {
  constructor() {
    this.panes = new Pane("root");
  }
}
