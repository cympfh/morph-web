<script lang="ts">
  import ItemTable from "./components/ItemTable.svelte";
  import ControlPanel from "./components/ControlPanel.svelte";
  import { Increment, Todo, Wip, Done, Abort } from "./utils/button";
  import { Client } from "./utils/client";

  class Item {
    id: number;
    name: string;
    level: number;
    done: boolean;
    at: string;
  }

  class ItemList {
    name: string;
    visible: bool;
    data: Array<Item>;
    constructor(name, visible, data) {
      this.name = name;
      this.visible = visible;
      this.data = data;
    }
  }

  class Dataset {
    todo: Array<Item>;
    wip: Array<Item>;
    done: Array<Item>;
    abort: Array<Item>;
    constructor() {
      this.todo = new ItemList("todo", false, []);
      this.wip = new ItemList("wip", true, []);
      this.done = new ItemList("done", false, []);
      this.abort = new ItemList("abort", false, []);
      this.refresh();
    }
    refresh() {
      let client = new Client();
      client
        .items()
        .then((res) => res.json())
        .then((res) => {
          this.todo.data = res.TODO;
          this.wip.data = res.WIP.sort((a, b) => b.id - a.id);
          this.done.data = res.DONE.map((item) => {
            item.done = true;
            return item;
          });
          this.abort.data = res.ABORT;
          dataset = dataset;
        });
    }
  }
  let dataset = new Dataset();

  // buttons
  const increment = new Increment(dataset);
  const todo = new Todo(dataset);
  const wip = new Wip(dataset);
  const done = new Done(dataset);
  const abort = new Abort(dataset);
</script>

<main>
  <section class="hero">
    <div class="hero-body">
      <p class="title">morph/</p>
      <p class="subtitle">levelized TODO list</p>
    </div>
  </section>
  <div class="section">
    <div class="container">
      <ItemTable itemlist={dataset.todo} buttons={[wip, abort]} />
      <ItemTable itemlist={dataset.wip} buttons={[increment, done, abort]} />
      <ItemTable itemlist={dataset.done} buttons={[]} />
      <ItemTable itemlist={dataset.abort} buttons={[todo, wip]} />
    </div>
  </div>
  <div class="section">
    <div class="container">
      <ControlPanel {dataset} />
    </div>
  </div>
</main>

<style global lang="scss">
  @import "main.scss";

  .list-header > svg {
    width: 1rem;
    max-width: 1rem;
    position: relative;
    top: 0.18rem;
  }
</style>
