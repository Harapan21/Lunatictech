<script>
  export let category;
</script>

<style>
  li {
    @apply inline-block bg-gray-200 rounded px-2 py-0 text-sm font-semibold text-gray-700 mr-2;
  }
</style>

<ul>
  {#each category as cat, i}
    <li id={i}>#{cat}</li>
  {/each}
</ul>
