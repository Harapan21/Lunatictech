<script>
  import Card from "../components/Card.svelte";
  export let movies = [
    { movie: "Captain Marvel", year: 2019, thumbnail: "movie.jpeg" }
  ];
</script>

<style>
  div {
    @apply p-5 h-full w-full;
  }
</style>

<svelte:head>
  <title>Hello Movie</title>
</svelte:head>

<div>
  {#each movies as { movie, year, thumbnail }, i}
    <Card key={i} name={movie} {year} {thumbnail} />
  {/each}
</div>
