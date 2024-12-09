<!--ShapeSvgWrapper-->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { disableAnimationForShapes } from "../disableAnimation";
  export let width: number | string | undefined = 250;
  export let height: number | string | undefined = 250;
  export let viewBox = "0 0 250 250";
  let isBouncing = false;
  $: disableAnimationForShapes;

  const dispatch = createEventDispatcher();

  const handleClickBigShape = () => {
    dispatch("clickOrkeyDown");
    isBouncing = false;
    setTimeout(() => {
      isBouncing = true;
    }, 0);
  };
</script>

<svg-animation class={$disableAnimationForShapes ? "shape-spin" : ""}>
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
</svg-animation>

<style>
  svg-animation {
    animation: spin 0s linear infinite;
    display: inline-block;
  }

  svg-animation.shape-spin {
    animation: spin 70s linear infinite;
    /* 70 seconds turn off to save my pcs life */
    display: inline-block;
    /* finish turn off animations setting */
  }
</style>
