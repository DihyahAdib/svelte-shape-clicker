<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let width: number | string | undefined = 250;
  export let height: number | string | undefined = 250;
  export let viewBox = "0 0 250 250";
  let isBouncing = false;
  const dispatch = createEventDispatcher();
  const handleClickBigShape = () => {
    dispatch("clickOrkeyDown");
    isBouncing = true;
    setTimeout(() => {
      isBouncing = false;
    }, 100);
  };
</script>

<svg
  class={isBouncing ? "bouncy" : ""}
  xmlns="http://www.w3.org/2000/svg"
  {width}
  {height}
  {viewBox}
  style="overflow: visible;"
  type="button"
  on:click={() => {
    handleClickBigShape();
  }}
  on:keydown={(event) => {
    if (event.key === " ") {
      handleClickBigShape();
    }
  }}
>
  <slot>Forgot shape here</slot></svg
>

<style>
  .bouncy {
    animation: bounce 0.4s ease-in-out;
  }
</style>
