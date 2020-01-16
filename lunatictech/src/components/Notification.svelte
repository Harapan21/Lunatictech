<script>
  import { panel_router } from "../store";
  import Icon from "./Icon.svelte";
  let isNotification = false;
  export let count;

  function handleNotification() {
    isNotification = !isNotification;
  }
  $: if (panel_router > 1) {
    handleNotification();
  }
  $: isNotification ? panel_router.set(0) : panel_router.set(1);
</script>

<style>
  div {
    @apply relative p-3  shadow-xl flex items-center justify-center select-none cursor-pointer;
    height: 35px;
    width: 35px;
    z-index: 2;
  }
  div,
  .ripple:before,
  .ripple:after {
    border-radius: 0.6rem;
    background: var(--green);
    transition: background 0.2s;
  }

  .ripple:before,
  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .ripple:hover:before,
  .ripple:hover:after {
    -webkit-animation: none;
    animation: none;
  }
  .ripple:before {
    animation: ripple 2s linear infinite;
  }
  .ripple:after {
    animation: ripple 2s linear 1s infinite;
  }
  @keyframes ripple {
    0% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.3);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  .active,
  .active::after,
  .active::before {
    background: #ffffff;
    color: var(--green);
  }
</style>

<div
  on:click={handleNotification}
  class:active={isNotification}
  class:ripple={count}>
  {#if isNotification}
    <Icon width={30} height={30} icon="x" opt={{ 'stroke-width': 3 }} />
  {:else if count}
    {count}
  {:else}
    <Icon width={30} height={30} icon="bell" opt={{ 'stroke-width': 3 }} />
  {/if}
</div>
