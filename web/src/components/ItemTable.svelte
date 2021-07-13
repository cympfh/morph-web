<script>
  import { fly, fade, slide } from "svelte/transition";
  import Icon from "svelte-awesome";
  import * as Icons from "svelte-awesome/icons";

  export let itemlist;
  export let buttons;
</script>

<div class="content p">
  <span class="list-header" on:click={() => (itemlist.visible ^= true)}>
    <Icon data={itemlist.visible ? Icons.caretDown : Icons.caretRight} />
    {itemlist.name}/</span
  >
  {#if itemlist.visible}
    <table class="table">
      <tbody>
        {#if itemlist.data.length > 0}
          {#each itemlist.data as item (item.id)}
            <tr in:slide>
              <td class="q">{item.name}</td>
              <td class="q">
                <progress
                  max={item.done ? item.level : item.level + 1}
                  value={item.level}
                />
                <code>Lv.{item.level}</code>
              </td>
              {#if item.done}
                <td>
                  <date>@{item.at}</date>
                </td>
              {/if}
              {#each buttons as button}
                <td>
                  <button
                    class="button is-small"
                    class:is-warning={button.warning}
                    on:click={button.run(item.id)}>{button.label}</button
                  >
                </td>
              {/each}
            </tr>
          {/each}
        {:else}
          <tr><td>NO ITEMS</td></tr>
        {/if}
      </tbody>
    </table>
  {/if}
</div>

<style>
  td.q {
    width: 30%;
  }

  .list-header {
    font-weight: bold;
    cursor: pointer;
    width: 100%;
  }

  .list-header > svg {
    width: 1rem;
    max-width: 1rem;
    position: relative;
    top: 0.2rem;
  }

  date {
    font-family: monospace;
    font-size: 0.8rem;
  }
</style>
