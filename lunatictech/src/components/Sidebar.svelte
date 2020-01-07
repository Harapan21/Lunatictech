<script>
  import Headline from "./Headline.svelte";
  export let segment;
</script>

<style>
  #sidebar {
    @apply border-r-2 border-gray-100 w-1/6 bg-white;
  }
  /* nav {
    @apply px-6 pt-3;
  } */
  ul {
    @apply flex content-between flex-col;
  }
  li {
    @apply items-center px-6 py-2;
  }
</style>

<div id="sidebar">
  <Headline />
  <nav>
    <ul>
      <li>
        <a class:selected={segment === 'category'} href="category">Discover</a>
      </li>
      <li>
        <a class:selected={segment === 'about'} href="about">Movie</a>
      </li>
      <li>
        <a rel="prefetch" class:selected={segment === 'blog'} href="blog">
          Game
        </a>
      </li>
    </ul>
  </nav>
</div>
