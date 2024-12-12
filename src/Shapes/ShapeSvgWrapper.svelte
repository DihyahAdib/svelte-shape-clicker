<!--ShapeSvgWrapper-->
<script>
  import { disableAnimationForShapes } from "../disableAnimation";

  // Variables and props
  let width = 250;
  let height = 250;
  let viewBox = "0 0 250 250";
  let { inflate, children } = $props();
  let isBouncing = $state(false);

  $effect(() => {
    disableAnimationForShapes;
  });

  const handleClickBigShape = () => {
    inflate("clickOrkeyDown");
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
    onclick={handleClickBigShape}
    onkeydown={handleClickBigShape}
    role="button"
    tabindex="0"
  >
    {#if children}{@render children()}{:else}Forgot shape here{/if}</svg
  >
</svg-animation>

<style>
  svg {
    overflow: visible;
  }
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
