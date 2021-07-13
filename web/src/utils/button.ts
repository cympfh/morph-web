import { Client } from "./client";

export interface MorphButton {
  label: string;
  warning: boolean;
  run(id: number);
}

export class Increment implements MorphButton {
  label = "+1";
  warning = false;
  dataset;
  constructor(dataset) {
    this.dataset = dataset;
  }
  run(id: number) {
    let client = new Client();
    client.inc(id).then(() => this.dataset.refresh());
  }
}

export class Done implements MorphButton {
  label = "DONE";
  warning = false;
  dataset;
  constructor(dataset) {
    this.dataset = dataset;
  }
  run(id: number) {
    let client = new Client();
    client.done(id).then(() => {
      this.dataset.refresh();
      this.dataset.done.visible = true;
    });
  }
}

export class Abort implements MorphButton {
  label = "ABORT";
  warning = true;
  dataset;
  constructor(dataset) {
    this.dataset = dataset;
  }
  run(id: number) {
    let client = new Client();
    client.abort(id).then(() => {
      this.dataset.refresh();
      this.dataset.abort.visible = true;
    });
  }
}

export class Wip implements MorphButton {
  label = "WIP";
  warning = false;
  dataset;
  constructor(dataset) {
    this.dataset = dataset;
  }
  run(id: number) {
    let client = new Client();
    client.wip(id).then(() => {
      this.dataset.refresh();
      this.dataset.wip.visible = true;
    });
  }
}

export class Todo implements MorphButton {
  label = "TODO";
  warning = false;
  dataset;
  constructor(dataset) {
    this.dataset = dataset;
  }
  run(id: number) {
    let client = new Client();
    client.todo(id).then(() => {
      this.dataset.refresh();
      this.dataset.todo.visible = true;
    });
  }
}
