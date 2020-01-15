<script>
  import { panel_router } from "../store";
  import Notification from "./Notification.svelte";
  import NotificationList from "./NotificationList.svelte";
  import Trending from "./Trending.svelte";
  export let avatar = "faces.jpg";
  let routerPanel = { notification: Notification, treding: Trending };
  let notification = false;
  function handleNotification(param) {
    notification = !notification;
  }
</script>

<style>
  #panel {
    @apply text-white w-1/4  p-5 relative overflow-hidden;
    background: var(--black);
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    transition: background 0.2s;
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
</style>

<div id="panel" class="sm:w-full" class:active={notification}>
  <div class="menu">
    <Notification count={2} {notification} on:click={handleNotification} />
    <img alt="profile" src={avatar} />
  </div>
  <h1>{notification ? 'Notification' : 'Trending'}</h1>
  <routerPanel[$panel_router] />
</div>
