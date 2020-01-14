<script>
  import Notification from "./Notification.svelte";
  import NotificationList from "./NotificationList.svelte";
  import Trending from "./Trending.svelte";
  export let avatar = "faces.jpg";

  let notification = false;
  function handleNotification() {
    notification = !notification;
  }
</script>

<style>
  #panel {
    @apply text-white w-1/4 rounded-l-lg p-5 relative overflow-hidden;
    background: var(--black);
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    transition: background 0.2s;
  }
  #panel.active {
    background: var(--green) !important;
  }
  .list {
    @apply overflow-hidden max-h-full;
  }
  h1 {
    @apply text-sm;
    font-family: var(--roboto);
    text-transform: uppercase;
    font-weight: 700;
    line-height: 2px;
  }
  h3 {
    @apply text-sm;
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
  span {
    transition: width 0.2s, height 0.2s;
  }
</style>

<div id="panel" class="sm:w-full" class:active={notification}>
  <div class="menu">
    <Notification count={2} {notification} {handleNotification} />
    <img alt="profile" src={avatar} />
  </div>
  <h1>{notification ? 'Notification' : 'Trending'}</h1>
  {#if notification}
    <NotificationList />
  {:else}
    <Trending />
  {/if}
</div>
