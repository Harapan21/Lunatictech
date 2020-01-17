<script>
  import TailWind from "../components/Tailwind.svelte";
  import PostItem from "../components/PostItem.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import StickyHead from "../components/StickyHead.svelte";
  import Panel from "../components/Panel.svelte";
  export let segment;
</script>

<style>
  .cover {
    background: var(--green3);
    @apply h-screen w-screen p-2;
  }
  .root {
    border-radius: 1rem;
    @apply flex h-full w-full relative overflow-hidden bg-white shadow-lg border border-gray-300;
  }
  main {
    @apply flex-1 h-full overflow-y-scroll flex flex-col;
    position: relative;
    background-color: white;
    box-sizing: border-box;
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;
    transition: all 0.1s ease-in;
  }
  main:hover {
    scrollbar-color: var(--green) transparent;
    transition: all 0.1s ease-in;
  }
  main::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  main:hover::-webkit-scrollbar-thumb {
    background-color: var(--green);
    border-radius: 6px;
  }
</style>

<TailWind />
<div class="cover">
  <div class="root">
    <Sidebar {segment} />
    <main>
      <StickyHead {segment} />
      <slot />
    </main>
    <Panel />
  </div>
</div>
