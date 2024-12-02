<!-- app.svelte file -->
<script lang="ts">
  import { gamestate } from "./gameInstance";
  // import { updateClicksDisplay } from "./Ui";

  window.getState = () => gamestate;

  let name = "Shape Clicker";
  let clicks = gamestate.data.shapesClicked;

  const updateClicksDisplay = () => {
    gamestate.click();
    clicks = gamestate.data.shapesClicked;
  };
</script>

<body>
  <main>
    <h1>{name}</h1>
    <stats-container>
      <button class="restart-game" on:click={() => gamestate.reset()}
        >Restart the Game
      </button>
      <p>Clicks: {clicks}</p>
    </stats-container>
    <button on:click={updateClicksDisplay}>Click Me</button>
  </main>
</body>

<style>
  main {
    width: 50%;
    padding: 1em;
    margin: 0 auto;
    text-align: center;
    background-color: rgb(236, 236, 236);
    border-radius: 10px;
  }

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
</style>
