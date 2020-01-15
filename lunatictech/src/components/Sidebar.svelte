<script>
  import Headline from "./Headline.svelte";
  import { scale } from "svelte/transition";
  import { active_post } from "../store";
  import Icon from "./Icon.svelte";
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
  a {
    @apply outline-none;
  }
  li {
    @apply items-center px-6 py-2;
  }

  #menu a {
    @apply text-sm flex items-center;
    transition: all 0.2s ease-in-out;
  }
  #menu a.selected {
    @apply pl-1;
    font-size: 120%;
    font-weight: 700;
  }
  #menu a span {
    @apply ml-2;
  }
  #information {
    @apply mt-12;
  }
  #information > li {
    @apply py-1;
  }
  .create-post {
    @apply flex items-center cursor-pointer text-white p-3 text-base;
    background: var(--green);
  }
</style>

<div id="sidebar">
  <Headline />
  <nav>
    <a class="create-post" href="#">
      <Icon width={15} height={15} icon="plus" />
      <span>Post</span>
    </a>
    <ul id="menu">
      {#if $active_post}
        <li in:scale={{ duration: 200 }}>
          <a class:selected={$active_post.title != ''} href="discover">
            {$active_post.title}
          </a>
        </li>
      {/if}
      <li>
        <a class:selected={segment === 'discover'} href="discover">
          <Icon width={15} height={15} icon="rss" />
          <span>Discover</span>
        </a>
      </li>
      <li>
        <a class:selected={segment === 'movie'} href="movie">
          <Icon width={15} height={15} icon="film" />
          <span>Movie</span>
        </a>
      </li>
      <li>
        <a rel="prefetch" class:selected={segment === 'game'} href="game">
          <Icon width={15} height={15} icon="codesandbox" />
          <span>Game</span>
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
