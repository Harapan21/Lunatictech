<script>
  import Headline from "./Headline.svelte";
  import { title } from "../store";
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

  #menu a {
    @apply text-sm;
    transition: all 0.2s ease-in-out;
  }
  #menu a.selected {
    @apply pl-1;
    font-size: 120%;
    font-weight: 700;
  }
  #information {
    @apply mt-12;
  }
  #information > li {
    @apply py-1;
  }
</style>

<div id="sidebar">
  <Headline />
  <nav>
    <ul id="menu">
      {#if title != ''}
        <li>
          <a class:selected={title != ''} href="discover">{$title}</a>
        </li>
      {/if}
      <li>
        <a class:selected={segment === 'discover'} href="discover">Discover</a>
      </li>
      <li>
        <a class:selected={segment === 'about'} href="about">Movie</a>
      </li>
      <li>
        <a rel="prefetch" class:selected={segment === 'game'} href="game">
          Game
        </a>
      </li>
    </ul>
    <ul id="information">
      <li>
        <h3>Lunatictech</h3>
      </li>
      <li>
        <a class:selected={segment === 'about'} href="about">about</a>
      </li>
      <li>
        <a class:selected={segment === 'privacy'} href="privacy">privacy</a>
      </li>
      <li>
        <a class:selected={segment === 'contact'} href="contact">contact</a>
      </li>
    </ul>
  </nav>
</div>
