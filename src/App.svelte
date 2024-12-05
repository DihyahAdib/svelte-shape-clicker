<!-- app.svelte file -->
<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  let level = 0;
  let shapesClicked = 0;
  let achievements = 0;
  let multiplier = 0.0;
  let quota = 15;

  let isOpen = false;
  let isBouncing = false;
  let disableAnimation = false;
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
    }
  };

  loadState();

  const resetGame = () => {
    level = 0;
    shapesClicked = 0;
    achievements = 0;
    multiplier = 0.0;
    quota = 15;
    localStorage.removeItem("currentState");
    showFinalWarning = false;
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

  function formatPlaceValue(number: number): string {
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
    isBouncing = true;
    setTimeout(() => {
      isBouncing = false;
    }, 100);
  };

  $: saveState();

  $: if (shapesClicked >= quota) {
    quota *= 3;
    level++;
    multiplier += 0.5;
    console.log("New Quota:", quota);
    console.log("multiplier:", multiplier);
  }
  $: level = 1; //test shape change to levels here.
  $: shapesClicked = 0; //test place value changes to shapes here.
</script>

<body>
  <main-container>
    <main>
      <h1>Shape Clicker</h1>
    </main>
    <main-game>
      <stats-container>
        <stats>
          <level>Level: {level}</level>
          {#if level === 1}
            current Quota:{quota}
          {:else}
            Next Quota:{quota}{/if}
          <p>+{multiplier} Shapes</p>

          <p>{formatPlaceValue(shapesClicked)} Shapes</p>
        </stats>
        {#if level === 1 && quota < 46}
          <prompt-frame in:fly={{ y: 180, duration: 600 }} out:fade>
            <div id="prompt">
              <span id="c">Well done!</span> You will now have more shapes added
              to the ones you are already clicking on since you have met your
              <span id="c0">initial quota.</span> Do you understand? Okay, just keep
              clicking, and I'll stop bothering you!
            </div>
          </prompt-frame>
        {/if}
      </stats-container>

      <svg-handler>
        {#if level < 15}
          <svg
            class={isBouncing ? "bouncy" : ""}
            width="250"
            height="250"
            viewBox="0 0 250 250"
            tabindex="0"
            role="button"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleClickBigShape();
              }
            }}
          >
            <polygon id="" points="125,0 250,250 0,250" fill="#ff6347" />
          </svg>
        {:else if level >= 15 && level < 50}
          <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleClickBigShape();
              }
            }}
          >
            <rect width="250" height="250" fill="#2196f3" />
          </svg>
        {:else if level >= 50 && level < 150}
          <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleClickBigShape();
              }
            }}
          >
            <rect
              transform="translate(0 0) skewX(10) skewY(0)"
              x="0"
              y="0"
              width="210"
              height="230"
              fill="#00bcd4"
            ></rect>
          </svg>
        {:else if level >= 150 && level < 300}
          <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleClickBigShape();
              }
            }}
          >
            <polygon
              points=" 125,0 31.25,62.5 31.25,187.5 125,250  218.75,187.5 218.75,62.5"
              fill="#e91e63"
            />
          </svg>
        {:else if level >= 300 && level < 500}
          <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleClickBigShape();
              }
            }}
          >
            <polygon
              points=" 125,0 
      187.5,0  250,62.5  250,187.5  187.5,250 
      125,250 
      62.5,250  0,187.5  0,62.5  62.5,0"
              fill="#00bcd4"
            />
          </svg>
        {:else if level >= 500 && level < 1000}
          <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleClickBigShape();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="250"
                height="250"
                viewBox="-177 -177 354 354"
                style="overflow: visible;"
                ><polygon
                  class="polygon"
                  points="175,0 134.05777754582115,112.48783169514437 30.38843109171282,172.3413567771364 -87.49999999999996,151.55444566227678 -164.44620863753394,59.85352508199205 -164.44620863753397,-59.85352508199202 -87.50000000000007,-151.55444566227672 30.388431091712746,-172.3413567771364 134.05777754582112,-112.48783169514442 "
                  fill="#37c8b0"
                  stroke="#7a7a7a"
                  stroke-width="0"
                  transform="rotate(0, 0, 0)"
                  on:click={() => {
                    handleClickBigShape();
                  }}
                  on:keydown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleClickBigShape();
                    }
                  }}
                ></polygon></svg
              ></svg
            >
          </svg>
        {:else if level >= 1000 && level < 2500}
          <svg
            width="250"
            height="250"
            viewBox="-177 -177 354 354"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleClickBigShape();
              }
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#d83bbe"></stop>
                <stop offset="100%" stop-color="#a43d3d"></stop>
              </linearGradient>
            </defs>
            <polygon
              points="167.5,0 135.5103465578037,98.45402975898925 51.7603465578037,159.30196647943822 -51.76034655780368,159.30196647943825 -135.51034655780367,98.45402975898926 -167.5,2.0512833885718166e-14 -135.51034655780373,-98.45402975898924 -51.760346557803715,-159.30196647943822 51.76034655780366,-159.30196647943825 135.51034655780367,-98.4540297589893 "
              fill="url(#gradient)"
              stroke="#7a7a7a"
              stroke-width="0"
              transform="rotate(0, 0, 0)"
            />
          </svg>
        {:else if level >= 2500}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            on:click={() => {
              handleClickBigShape();
            }}
            on:keydown={(event) => {
              if (event.key === " " || event.key === " ") {
                handleClickBigShape();
              }
            }}
            ><defs
              ><radialGradient
                id="sssurface-grad-dark"
                r="75%"
                cx="20%"
                cy="20%"
              >
                <stop
                  offset="0%"
                  stop-color="hsl(351, 100%, 67%)"
                  stop-opacity="0"
                ></stop>
                <stop offset="100%" stop-color="#c61945" stop-opacity="1"
                ></stop>
              </radialGradient><radialGradient
                id="sssurface-grad-light"
                r="25%"
                cx="30%"
                cy="30%"
              >
                <stop offset="0%" stop-color="#ff8b9e" stop-opacity="0.75"
                ></stop>
                <stop
                  offset="100%"
                  stop-color="hsl(351, 100%, 67%)"
                  stop-opacity="0"
                ></stop>
              </radialGradient><filter
                id="sssurface-blur"
                x="-100%"
                y="-100%"
                width="400%"
                height="400%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feGaussianBlur
                  stdDeviation="30"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  in="SourceGraphic"
                  edgeMode="none"
                  result="blur"
                ></feGaussianBlur></filter
              ></defs
            ><g
              ><ellipse
                rx="153"
                ry="76.5"
                cx="450"
                cy="500"
                fill="#8f001f"
                opacity="0.25"
                filter="url(#sssurface-blur)"
              ></ellipse><circle
                r="153"
                cx="400"
                cy="400"
                fill="hsl(351, 100%, 67%)"
              ></circle><circle
                r="153"
                cx="400"
                cy="400"
                fill="url(#sssurface-grad-dark)"
              ></circle><circle
                r="153"
                cx="400"
                cy="400"
                fill="url(#sssurface-grad-light)"
              ></circle></g
            ></svg
          >
        {:else}
          You broke the Gamepad... Somehow.
        {/if}
      </svg-handler>

      {#if isOpen}
        <div id="overlay" transition:fade></div>
        <settings-frame
          in:fly={{ y: -250, duration: 600 }}
          out:fly={{ y: -250, duration: 600 }}
        >
          <h3>Settings</h3>
          <button class="btn" on:click={togglePrompt}>Close</button>

          <button class="btn" on:click={handleRestartClick}
            >Restart the game</button
          >

          {#if showFinalWarning}
            <final-warning transition:scale>
              <h4>Hold It!</h4>
              <p>
                Your about to lose <span id="c1">ALL</span> of your data! This action
                cannot be undone.
              </p>
              <button class="btn-reset" on:click={resetGame}
                >Yes, restart</button
              >
              <button class="btn-no-reset" on:click={closeWarning}
                >Uhh, Maybe not</button
              >
            </final-warning>
          {/if}

          {#if disableAnimation}
            <p>Disabled</p>
          {/if}

          <button
            class="btn"
            on:click={() => (disableAnimation = !disableAnimation)}
            >Disable Animations</button
          >
        </settings-frame>
      {/if}
    </main-game>
    <main>
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
    </main>
  </main-container>
</body>

<style>
  #c {
    color: yellow;
  }
  #c0 {
    color: bisque;
  }
  #c1 {
    color: red;
  }
  /* #c2 {
    color: #401006;
  } */
  svg-handler {
    position: relative;
    transform: translate(0%, 0%);
  }

  svg {
    transform-origin: center;
    outline: none;
    cursor: pointer;
  }

  prompt-frame {
    position: absolute;
    width: 34%;
    transform: translate(5%, 100%);
    background-color: rgba(226, 232, 236, 0);
    z-index: 20;
  }

  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.28);
    z-index: 10;
  }

  settings-frame {
    position: fixed;
    border-radius: 14px;
    width: 30%;
    height: 50%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 20;
  }

  #GC {
    width: 50px;
    height: 50px;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.924);
  }

  .gear {
    width: 40px;
    height: 40px;
    stroke: #004cff;
    transition: transform 0.3s ease;
  }

  .gear.spin-in {
    animation: spinIn 0.3s linear;
  }

  #prompt {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.398);
    text-wrap: wrap;
    text-align: left;
  }

  .bouncy {
    animation: bounce 0.4s ease-in-out;
  }

  final-warning {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    background-color: rgb(71, 71, 71);
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  final-warning p {
    margin-bottom: 20px;
  }

  stats {
    display: flex;
    height: 10%;
    background-color: rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
