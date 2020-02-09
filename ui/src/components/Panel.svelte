<script>
  import { panel_router } from "../store";
  import Notification from "./Notification.svelte";
  import NotificationList from "./NotificationList.svelte";
  import Trending from "./Trending.svelte";
  import Topic from "./Topic.svelte";
  import ProfileMenu from "./ProfileMenu.svelte";
  export let avatar = "faces.jpg";
  let routerPanel = [
    {
      title: "notification",
      component: NotificationList
    },
    { title: "trending", component: Trending },
    {
      title: "topic",
      component: Topic
    },
    {
      title: "profile",
      component: ProfileMenu
    }
  ];
  function handleMouseLeave() {
    if ($panel_router === 2) {
      panel_router.set(1);
    }
  }
  function handleProfile() {
    panel_router.set(3);
  }
  $: console.log($panel_router);
</script>

<style>
  #panel {
    @apply text-white p-5  overflow-hidden;

    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    transition: background 0.2s ease-in, width 0.2s ease-in-out;
  }
  #panel.active {
    background: var(--green) !important;
  }
  h1 {
    @apply text-sm;
    font-family: var(--roboto);
    text-transform: uppercase;
    font-weight: 700;
    line-height: 2px;
  }
  .menu {
    @apply flex items-center w-full p-3 justify-end;
  }
  .menu > * {
    height: 35px;
    width: 35px;
    background: var(--green);
    @apply rounded-lg ml-5 overflow-hidden relative flex items-center justify-center cursor-pointer shadow-xl select-none;
    transition: transfrom 0.2s;
  }
  img {
    @apply absolute w-full h-full shadow-xl;
  }
  .notification {
    @apply w-1/4 relative;
    background: var(--black);
  }
  .profile {
    @apply bg-white w-1/4 relative;
  }
  .topic {
    @apply w-3/4 absolute right-0 top-0 h-full z-50;
  }
  .trending {
    @apply w-1/4 relative;
    background: var(--black);
  }
</style>

<div
  id="panel"
  class:active={$panel_router === 0}
  on:mouseleave={handleMouseLeave}
  class={routerPanel[$panel_router].title}>
  <div class="menu">
    <Notification count={2} />
    <img on:click={handleProfile} alt="profile" src={avatar} />
  </div>
  <h1>{routerPanel[$panel_router].title}</h1>
  <svelte:component this={routerPanel[$panel_router].component} />
</div>
