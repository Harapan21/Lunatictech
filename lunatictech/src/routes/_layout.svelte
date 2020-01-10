<script>
  import TailWind from "../components/Tailwind.svelte";
  import PostItem from "../components/PostItem.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Panel from "../components/Panel.svelte";
  export let segment;
</script>

<style>
  .root {
    @apply flex h-screen w-screen rounded;
  }
  main {
    @apply flex-1 max-h-full overflow-y-auto;
    position: relative;
    background-color: white;
    box-sizing: border-box;
    scrollbar-color: var(--green) transparent;
    scrollbar-width: thin;
  }
  main::-webkit-scrollbar-track {
    background: transparent;
  }
  main::-webkit-scrollbar-thumb {
    background-color: var(--green);
    border-radius: 6px;
    border: 3px solid transparent;
  }
</style>

<TailWind />

<div class="root">
  <Sidebar {segment} />
  <main>
    <slot />
  </main>
  <Panel />
</div>
