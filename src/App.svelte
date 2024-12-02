<!-- app.svelte file -->
<script lang="ts">
  export const SHAPES = {
    SQUARE: "SQUARE",
    PENTAGON: "PENTAGON",
    HEXAGON: "HEXAGON",
    HEPTAGON: "HEPTAGON",
    OCTAGON: "OCTAGON",
    NONAGON: "MEMO_MODE",
    DECAGON: "BTN_MODE",
  };

  let level = 0;
  let startingShape = SHAPES.SQUARE;
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
    startingShape = SHAPES.SQUARE;
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
</script>

<body>
  <main-left> </main-left>
  <main>
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
        <div id="prompt" class="make-prompt-unseen">some Text</div>
      {:else}
        <div id="prompt" class="make-prompt-seen">some Text</div>
      {/if}
    </stats-container>
  </main>
  <main-right> </main-right>
</body>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  stats-container {
    gap: 10px;
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    font-weight: 500;
  }

  .restart-game {
    text-align: center;
    background-color: rgb(166, 26, 26);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  .restart-game:hover {
    background-color: rgb(200, 50, 50);
  }

  #prompt {
    visibility: hidden;
  }
  #prompt.make-prompt-unseen {
    visibility: hidden;
  }
  #prompt.make-prompt-seen {
    visibility: visible;
  }
</style>
