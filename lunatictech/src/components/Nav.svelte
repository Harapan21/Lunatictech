<script>
  import UserIcon from "./UserIcon.svelte";
  export let segment;
</script>

<style>
  nav {
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    text-transform: uppercase;
    font-size: 0.8em;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
  .logo {
    font-size: 1.3rem;
    color: var(--green);
  }
</style>

<nav class="flex justify-between sticky items-center">
  <ul class="flex items-center">
    <a class="p-0" href=".">
      <h1 class="logo p-0">Lunatictech</h1>
    </a>
    <li>
      <a class:selected={segment === 'about'} href="about">about</a>
    </li>
    <li>
      <a rel="prefetch" class:selected={segment === 'blog'} href="blog">blog</a>
    </li>
  </ul>
  <ul class="flex items-center">
    <li>
      <a class:selected={segment === 'about'} href="about">
        <UserIcon />
      </a>
    </li>
  </ul>
</nav>
