<script>
  import { blog } from "../store";
</script>

<style>
  a {
    @apply px-6 py-5 bg-white block;
  }
  h1 {
    color: var(--green);
    font-size: 1.3em;
  }
  h3 {
    font-family: var(--roboto);
    font-weight: 700;
    font-size: 0.8em;
  }
</style>

{#if !$blog.info.loading}
  <a href="discover">
    <h1>{$blog.info.name}</h1>
    <h3>{$blog.info.description}</h3>
  </a>
{/if}
