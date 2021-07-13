<script lang="ts">
  import Icon from "svelte-awesome";
  import * as Icons from "svelte-awesome/icons";

  import { Client } from "../utils/client";

  export let dataset;
  let item_name = "";

  function add() {
    item_name = item_name.trim();
    if (!item_name) {
      return;
    }
    let client = new Client();
    client.add(item_name).then(() => {
      item_name = "";
      dataset.todo.visible = true;
      dataset.refresh();
    });
  }

  function undo() {
    let client = new Client();
    if (confirm("undo?")) {
      client.undo().then(() => dataset.refresh());
    }
  }
</script>

<div class="field">
  <div class="field has-addons">
    <div class="control has-icons-left">
      <input
        class="input"
        type="text"
        placeholder="Item Name"
        bind:value={item_name}
      />
      <span class="icon is-left">
        <Icon data={Icons.plus} />
      </span>
    </div>
    <div class="control">
      <button class="button is-link" on:click={add}>Add</button>
    </div>
  </div>
  <div class="field">
    <button class="button" on:click={undo}>Undo</button>
  </div>
</div>
