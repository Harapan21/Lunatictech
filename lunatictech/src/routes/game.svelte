<script>
  import Card from "../components/Card.svelte";

  export let games = [{ game: "FIFA", year: 2019, thumbnail: "game.jpg" }];
</script>

<style>
  div {
    @apply p-5 h-full w-full m-0;
  }
</style>

<svelte:head>
  <title>Hello Movie</title>
</svelte:head>

<div>
  {#each games as { game, year, thumbnail }, i}
    <Card key={i} name={game} {year} {thumbnail} topic="game" />
  {/each}
</div>
