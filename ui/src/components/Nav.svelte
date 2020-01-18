<script>
  import UserIcon from "./UserIcon.svelte";
  export let segment;
</script>

<style>
  .topbar {
    @apply flex justify-between sticky items-center px-3 border-b border-gray-200;
  }
  .topbar div {
    @apply m-0;
  }
  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .logo,
  h1 {
    @apply p-0;
  }
  .logo {
    @apply pr-8;
  }
  h1 {
    font-size: 1.3rem;
    font-family: var(--roboto);
    font-weight: 600;
    color: var(--green);
  }
</style>

<div class="topbar">
  <div class="logo">
    <a class:selected={segment === 'undifined'} href=".">
      <h1>Lunatictech</h1>
    </a>
  </div>
  <div>
    <a class:selected={segment === 'about'} href="about">
      <UserIcon />
    </a>
  </div>
</div>
