<!-- app.svelte file -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  let level = 0;
  let shapesClicked = 0;
  let achievements = 0;
  let multiplier = 0.0;
  let quota = 15;
  let currentQuo = 0;
  let isOpen = false;

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
      currentQuo = savedState.currentQuo;
    }
  };

  loadState();

  const saveState = () => {
    localStorage.setItem(
      "currentState",
      JSON.stringify({
        level,
        shapesClicked,
        achievements,
        multiplier,
        quota,
        currentQuo,
      })
    );
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
  };

  $: saveState();

  const resetGame = () => {
    level = 0;
    shapesClicked = 0;
    achievements = 0;
    multiplier = 0.0;
    quota = 15;
    currentQuo = 0;
    localStorage.removeItem("currentState");
  };

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
    <main></main>
    <main-game>
      <h1>Shape Clicker</h1>
      <stats-container>
        <level>Level: {level}</level>
        {#if level === 1}
          current Quota:{quota}
        {:else}
          Next Quota:{quota}{/if}
        <h3>+{multiplier} Shapes</h3>

        <p>{formatPlaceValue(shapesClicked)} Shapes</p>

        {#if level === 1 && quota < 46}
          <prompt-frame in:fly={{ y: 200, duration: 500 }} out:fade>
            <div id="prompt">
              Congrats! Youve reached your first quota, this will give you more
              shapes added onto the ones your already clicking. You get it? ok
              just keep clicking and ill get out of your hair!
            </div>
          </prompt-frame>
        {/if}
      </stats-container>
      <svg-handler>
        {#if level < 15}
          <svg
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
    </main-game>
    <main>
      {#if isOpen}
        <p>Show me</p>
      {/if}

      <button on:click={() => (isOpen = !isOpen)}>Settings</button>
      <button
        class="restart-game"
        on:click={() => {
          resetGame();
        }}
        >Restart the Game
      </button>
    </main>
  </main-container>
</body>

<style>
  h1 {
    margin: 8px;
    padding: 0;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 400;
  }
  svg {
    position: fixed;
    transform: translate(-50%, 5%);
    outline: none;
  }
  prompt-frame {
    position: absolute;
    width: 50%;
    z-index: 99;
    background-color: rgba(226, 232, 236, 0);
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
</style>
