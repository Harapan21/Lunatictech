<script>
  import TailWind from "../components/Tailwind.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  export let segment;
</script>

<style>
  .root {
    @apply flex h-screen w-screen rounded;
  }
  main {
    @apply flex-1;
    position: relative;
    background-color: white;
    box-sizing: border-box;
  }

  #panel {
    @apply w-1/5 rounded-l-lg;
    background-color: var(--black);
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }
</style>

<TailWind />

<div class="root">
  <Sidebar {segment} />
  <main>
    <slot />
  </main>
  <div id="panel" />
</div>
