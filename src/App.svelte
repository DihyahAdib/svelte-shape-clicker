<!-- app.svelte file -->
<script lang="ts">
  import Triangle from "./Shapes/Triangle.svelte";
  import Square from "./Shapes/Square.svelte";
  import Parallelogram from "./Shapes/Parallelogram.svelte";
  import Hexagon from "./Shapes/Hexagon.svelte";
  import Octagon from "./Shapes/Octagon.svelte";
  import Nonagon from "./Shapes/Nonagon.svelte";
  import Decagon from "./Shapes/Decagon.svelte";
  import Circle from "./Shapes/Circle.svelte";
  import ShapeSvgWrapper from "./Shapes/ShapeSvgWrapper.svelte";
  import {
    disableAnimationForShapes,
    toggleSpinAnimation,
  } from "./disableAnimation";
  import { fade, fly, scale } from "svelte/transition";

  let level = 0;
  let shapesClicked = 0;
  let achievements = 0;
  let multiplier = 0.0;
  let quota = 15;

  let isOpen = false;
  let disableAnimationForBg = true;
  $: disableAnimationForShapes;
  let showFinalWarning = false;

  const loadState = () => {
    const savedState = JSON.parse(
      localStorage.getItem("currentState") || "null"
    );
    if (savedState) {
      level = savedState.level;
      shapesClicked = savedState.shapesClicked;
      achievements = savedState.achievements;
      multiplier = savedState.multiplier;
      quota = savedState.quota;
      disableAnimationForBg = savedState.disableAnimationForBg;

      disableAnimationForShapes.set(
        JSON.parse(localStorage.getItem("disableAnimationForShapes") ?? "true")
      );
    }
  };

  loadState();

  const resetGame = () => {
    level = 0;
    shapesClicked = 0;
    achievements = 0;
    multiplier = 0.0;
    quota = 15;
    showFinalWarning = false;
    disableAnimationForBg = true;
    disableAnimationForShapes.set(true);
    localStorage.removeItem("disableAnimationForShapes");
    localStorage.removeItem("currentState");
  };

  const saveState = () => {
    localStorage.setItem(
      "currentState",
      JSON.stringify({
        level,
        shapesClicked,
        achievements,
        multiplier,
        quota,
      })
    );
    localStorage.setItem(
      "disableAnimationForShapes",
      JSON.stringify($disableAnimationForShapes)
    );
  };

  const handleRestartClick = () => {
    showFinalWarning = true; // Show the warning modal
  };

  const closeWarning = () => {
    showFinalWarning = false; // Close the warning modal
  };

  const togglePrompt = () => {
    isOpen = !isOpen;
  };

  const getShapeDimensions = () => {
    if (level >= 500 && level < 2500) {
      return { width: 250, height: 250, viewBox: "-177 -177 354 354" };
    } else if (level >= 2500) {
      return { width: "", height: "", viewBox: "0 0 800 800" };
    } else {
      return {};
    }
  };

  function formatPlaceValue(number: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    });

    if (number >= 1_000_000_000_000_000_000) {
      return formatter.format(number / 1_000_000_000_000_000_000) + "Qn"; // Quintillion
    } else if (number >= 1_000_000_000_000_000) {
      return formatter.format(number / 1_000_000_000_000_000) + "Qt"; // Quadrillion
    } else if (number >= 1_000_000_000_000) {
      return formatter.format(number / 1_000_000_000_000) + "T"; // Trillion
    } else if (number >= 1_000_000_000) {
      return formatter.format(number / 1_000_000_000) + "B"; // Billion
    } else if (number >= 1_000_000) {
      return formatter.format(number / 1_000_000) + "M"; // Million
    } else if (number >= 1_000) {
      return formatter.format(number / 1_000) + "K"; // Thousand
    }
    return formatter.format(number); // Less than 1,000
  }

  const handleClickBigShape = () => {
    shapesClicked++;
    shapesClicked += multiplier;
    saveState();
  };

  $: saveState();

  $: if (shapesClicked >= quota) {
    quota *= 3;
    level++;
    multiplier += 0.5;
    console.log("New Quota:", quota);
    console.log("multiplier:", multiplier);
  }
  $: level = 0; //test shape change to levels here.
  $: shapesClicked = 0; //test place value changes to shapes here.
</script>

<body>
  <main-container>
    <main id="left">.</main>
    <main-game class={disableAnimationForBg === true ? "bgAnimation" : ""}>
      <main-game-container>
        <stats-container>
          <stats>
            <p id="c2">{formatPlaceValue(shapesClicked)} Shapes</p>
            <p id="c3">+{multiplier} Shapes</p>
          </stats>
          {#if level === 1 && quota < 46}
            <prompt-frame
              class="popup arrow"
              in:fly={{ y: 180, duration: 600 }}
              out:fade
            >
              <div id="prompt">
                <span id="c">Well done!</span> You will now have more shapes
                added to the ones you are already clicking on since you have met
                your
                <span id="c0">initial quota</span>. Do you understand? Okay,
                just keep clicking, and I'll get outta ya hair!
              </div>
            </prompt-frame>
          {/if}
        </stats-container>

        <svg-handler>
          <ShapeSvgWrapper
            on:clickOrkeyDown={handleClickBigShape}
            width={getShapeDimensions().width}
            height={getShapeDimensions().height}
            viewBox={getShapeDimensions().viewBox}
          >
            {#if level < 15}
              <Triangle />
            {:else if level >= 15 && level < 50}
              <Square />
            {:else if level >= 50 && level < 150}
              <Parallelogram />
            {:else if level >= 150 && level < 300}
              <Hexagon />
            {:else if level >= 300 && level < 500}
              <Octagon />
            {:else if level >= 500 && level < 1000}
              <Nonagon />
            {:else if level >= 1000 && level < 2500}
              <Decagon />
            {:else if level >= 2500}
              <Circle />
            {:else}
              You broke the Game... Somehow.
            {/if}
          </ShapeSvgWrapper>
        </svg-handler>

        {#if isOpen}
          <div id="overlay" transition:fade></div>
          <settings-frame
            in:fly={{ y: -250, duration: 600 }}
            out:fly={{ y: -250, duration: 600 }}
          >
            <setting-items>
              <ul>
                <li><a href="#Top">Back Up</a></li>
                <li><a href="#Gen">General</a></li>
                <li><a href="#Aff">Affects</a></li>
                <li><a href="#Stats">Stats</a></li>
                <li><a href="#Down">Bottom</a></li>
              </ul>
              <top id="Top">Settings</top>
              <p class="Aff">All settings will save automatically.</p>
              <button class="" id="X" on:click={togglePrompt}>X</button>

              <h4 id="Gen">General</h4>
              <button class="btn" on:click={handleRestartClick}
                >Restart Game</button
              >
              <h4 id="Aff">Affects</h4>
              <p class="Aff">Disable Animations here.</p>
              {#if showFinalWarning}
                <final-warning transition:scale>
                  <hold-it>Hold It!</hold-it>
                  <p class="Quick">
                    Your about to lose <span id="c1">ALL</span> of your data!
                    This action <span id="c1">CANNOT</span> be undone.
                  </p>
                  <button class="btn-reset" on:click={resetGame}
                    >Yes, restart</button
                  >
                  <button class="btn-no-reset" on:click={closeWarning}
                    >Uhh, Maybe not</button
                  >
                </final-warning>
              {/if}

              <button class="btn butn" on:click={toggleSpinAnimation}
                >Disable Shape</button
              >
              {#if $disableAnimationForShapes}
                <h6>Enabled</h6>
              {:else}
                <h6>Disabled</h6>
              {/if}

              <button
                class="btn butn"
                on:click={() =>
                  (disableAnimationForBg = !disableAnimationForBg)}
                >Disable Background</button
              >
              {#if disableAnimationForBg}
                <h6>Enabled</h6>
              {:else}
                <h6>Disabled</h6>
              {/if}

              <h4 id="Stats">Stats & Data</h4>
              <p class="Aff">These dont do anything yet...</p>
              <button class="btn butn">Reset Shapes</button>

              <button class="btn butn">Reset Additional Shapes</button>

              <button class="btn butn">Reset Level</button>

              <button class="btn butn">Reset Quota</button>
              <h4 id="Down">.</h4>
            </setting-items>
          </settings-frame>
        {/if}
      </main-game-container>
    </main-game>
    <main id="right">
      <p id="c0">Shape Clicker<span>&trade;</span></p>
      <stats-container-right>
        <button id="GC" on:click={togglePrompt}>
          <svg
            class="gear {isOpen ? 'spin-in' : ''}"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M25 34c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-16c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"
            /><path
              d="M27.7 44h-5.4l-1.5-4.6c-1-.3-2-.7-2.9-1.2l-4.4 2.2-3.8-3.8 2.2-4.4c-.5-.9-.9-1.9-1.2-2.9L6 27.7v-5.4l4.6-1.5c.3-1 .7-2 1.2-2.9l-2.2-4.4 3.8-3.8 4.4 2.2c.9-.5 1.9-.9 2.9-1.2L22.3 6h5.4l1.5 4.6c1 .3 2 .7 2.9 1.2l4.4-2.2 3.8 3.8-2.2 4.4c.5.9.9 1.9 1.2 2.9l4.6 1.5v5.4l-4.6 1.5c-.3 1-.7 2-1.2 2.9l2.2 4.4-3.8 3.8-4.4-2.2c-.9.5-1.9.9-2.9 1.2L27.7 44zm-4-2h2.6l1.4-4.3.5-.1c1.2-.3 2.3-.8 3.4-1.4l.5-.3 4 2 1.8-1.8-2-4 .3-.5c.6-1 1.1-2.2 1.4-3.4l.1-.5 4.3-1.4v-2.6l-4.3-1.4-.1-.5c-.3-1.2-.8-2.3-1.4-3.4l-.3-.5 2-4-1.8-1.8-4 2-.5-.3c-1.1-.6-2.2-1.1-3.4-1.4l-.5-.1L26.3 8h-2.6l-1.4 4.3-.5.1c-1.2.3-2.3.8-3.4 1.4l-.5.3-4-2-1.8 1.8 2 4-.3.5c-.6 1-1.1 2.2-1.4 3.4l-.1.5L8 23.7v2.6l4.3 1.4.1.5c.3 1.2.8 2.3 1.4 3.4l.3.5-2 4 1.8 1.8 4-2 .5.3c1.1.6 2.2 1.1 3.4 1.4l.5.1 1.4 4.3z"
            /></svg
          >
        </button>
        <level>Level: {level}</level>
        {#if level === 1}
          current Quota:{quota}
        {:else}
          Next Quota:{quota}{/if}
      </stats-container-right>
    </main>
  </main-container>
</body>

<style lang="scss">
  $bg-url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC";
  $bg-width: 50px;
  $bg-height: 50px;

  /* Animations */
  @keyframes bg-scrolling-reverse {
    100% {
      background-position: $bg-width $bg-height;
    }
  }
  @keyframes bg-scrolling {
    0% {
      background-position: $bg-width $bg-height;
    }
  }

  main-game {
    color: hsl(0, 0%, 20%);
    text-align: center;
    background: url($bg-url) repeat 0 0;
    animation: bg-scrolling-reverse 0s infinite; /* 2 seconds turn off for no pc fans */
    animation-timing-function: linear;
    &::before {
      content: "SHAPE CLICKER";
      font-family: var(--Exo);
      font-size: 4rem;
      font-weight: 700;
    }
  }

  main-game.bgAnimation {
    color: hsl(0, 0%, 40%);
    text-align: center;
    background: url($bg-url) repeat 0 0;
    animation: bg-scrolling-reverse 2s infinite; /* 2 seconds turn off for no pc fans */
    animation-timing-function: linear;
    &::before {
      content: "SHAPE CLICKER";
      font-family: var(--Exo);
      font-size: 4rem;
      font-weight: 700;
    }
  }
  ul {
    position: fixed;
    text-align: start;
    display: flex;
    top: 25px;
    right: -5px;
    gap: 10px;
    margin: 15px;
    padding: 10px;
    width: 15%;
    height: 31%;
    background: rgb(146, 163, 177);
    border-radius: 10px;
    list-style-type: none;
    flex-direction: column;
    align-items: center;

    li {
      padding: 0;
      font-family: var(--Comfort);
      transform: scale(1);
      transition: transform 0.3s ease;
      a {
        text-decoration: none;
        color: whitesmoke;
        z-index: 100;
      }
    }
    li:hover {
      transform: scale(1.1);
      /* Correct hover transform */
    }
    a:hover {
      color: bisque;
    }
  }
</style>
