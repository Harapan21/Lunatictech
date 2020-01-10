<script>
  import { spring } from "svelte/motion";
  let notification = false;
  export let count;
  let notificationElement;
  function handleNotification() {
    notification = !notification;
  }
</script>

<style>
  svg {
    @apply absolute;
  }
  rect {
    fill: var(--green);
  }
</style>

<svg
  height="100%"
  width="100%"
  bind:this={notificationElement}
  class="notification"
  on:mouseenter={() => {
    console.log(notificationElement);
  }}
  on:click={handleNotification}>
  <rect x="0" y="0" width="100%" height="100%" />
  <text
    x="50%"
    y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    fill="currentColor">
    {notification ? 'x' : count}
  </text>
</svg>
