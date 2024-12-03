<!-- app.svelte file -->
<script lang="ts">
  export const SHAPES = {
    TRIANGLE: "TRIANGLE",
    SQUARE: "SQUARE",
    PENTAGON: "PENTAGON",
    HEXAGON: "HEXAGON",
    HEPTAGON: "HEPTAGON",
    OCTAGON: "OCTAGON",
    NONAGON: "NONAGON",
    DECAGON: "DECAGON",
  };

  let level = 0;
  let startingShape = SHAPES.TRIANGLE;
  let shapesClicked = 0;
  let achievements = 0;
  let multiplier = 0.0;
  let quota = 15;
  let currentQuo = 0;

  const loadState = () => {
    const savedState = JSON.parse(
      localStorage.getItem("currentState") || "null"
    );
    if (savedState) {
      level = savedState.level;
      startingShape = savedState.startingShape;
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
        startingShape,
        shapesClicked,
        achievements,
        multiplier,
        quota,
        currentQuo,
      })
    );
  };

  const handleClickBigShape = () => {
    shapesClicked++;
    shapesClicked += multiplier;
    saveState();
  };

  $: saveState();

  const resetGame = () => {
    level = 0;
    startingShape = SHAPES.TRIANGLE;
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
    console.log("REAL multiplier", multiplier);
  }

  $: startingShape = SHAPES.PENTAGON;
</script>

<body>
  <main-left></main-left>
  <main>
    {#if startingShape === SHAPES.TRIANGLE}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <polygon points="125,0 250,250 0,250" fill="#ff6347" />
      </svg>
    {:else if startingShape === SHAPES.SQUARE}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <rect width="250" height="250" fill="#2196f3" />
      </svg>
    {:else if startingShape === SHAPES.PENTAGON}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <rect
          transform="translate(0 0) skewX(10) skewY(0)"
          x="0"
          y="0"
          width="200"
          height="250"
          fill="#00bcd4"
        ></rect>
      </svg>
    {:else if startingShape === SHAPES.HEXAGON}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <polygon
          points="125,0 31.25,62.5 31.25,187.5 125,250 218.75,187.5 218.75,62.5"
          fill="#e91e63"
        />
      </svg>
    {:else if startingShape === SHAPES.HEPTAGON}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <polygon
          points="125,12.5 173.2,40.8 206.3,95.2 206.3,154.8 173.2,209.2 125,237.5 76.8,209.2 43.7,154.8 43.7,95.2 76.8,40.8"
          fill="#e91e63"
        />
      </svg>
    {:else if startingShape === SHAPES.OCTAGON}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <polygon
          points="125,12.5 171.4,12.5 212.5,53.6 212.5,93.6 171.4,134.6 125,134.6 78.6,134.6 37.5,93.6 37.5,53.6 78.6,12.5"
          fill="#00bcd4"
        />
      </svg>
    {:else if startingShape === SHAPES.NONAGON}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <polygon
          points="125,12.5 174.7,28.3 212.5,62.5 225,112.5 206.3,162.5 174.7,187.5 125,212.5 75.3,187.5 43.7,162.5 25,112.5 37.5,62.5"
          fill="#4caf50"
        />
      </svg>
    {:else if startingShape === SHAPES.DECAGON}
      <svg width="250" height="250" viewBox="0 0 250 250">
        <polygon
          points="125,12.5 160.2,24.5 192.3,54.5 203.5,92.5 192.3,130.5 160.2,160.5 125,172.5 89.8,160.5 57.7,130.5 46.5,92.5 57.7,54.5"
          fill="#2196f3"
        />
      </svg>
    {:else}
      <p>SOME FALLBACK SVG</p>
    {/if}
  </main>
  <main-right>
    <h1>Shape Clicker</h1>
    <stats-container>
      <level>Level: {level}</level>

      <p>Click to increase Quota and gain more shapes per click</p>

      {#if level === 1}
        current Quota:{quota}
      {:else}
        Next Quota:{quota}
      {/if}

      <h3>+{multiplier} Shapes</h3>

      <p>Shapes: {shapesClicked}</p>

      <button
        on:click={() => {
          handleClickBigShape();
        }}
        >Shapes
      </button>

      <button
        class="restart-game"
        on:click={() => {
          resetGame();
        }}
        >Restart the Game
      </button>
      {#if quota === 15}
        <div class="prompt make-prompt-unseen">some Text</div>
      {:else}
        <div class="prompt make-prompt-seen">some Text</div>
      {/if}
    </stats-container></main-right
  >
</body>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .prompt {
    visibility: hidden;
  }
  .prompt.make-prompt-unseen {
    visibility: hidden;
  }
  .prompt.make-prompt-seen {
    visibility: visible;
  }
</style>
