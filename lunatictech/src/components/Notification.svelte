<script>
  let notification = false;
  export let count;
  function handleNotification() {
    notification = !notification;
  }
</script>

<style>
  div {
    @apply relative p-3  shadow-xl flex items-center justify-center select-none;
    background: var(--green);
    border-radius: 0.5rem;
    height: 35px;
    width: 35px;
    z-index: 2;
  }
  div:before,
  div:after {
    content: "";
    border-radius: 0.5rem;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--green2);
    z-index: -1;
  }
  div:hover:before,
  div:hover:after {
    -webkit-animation: none;
    animation: none;
  }
  div:before {
    animation: ripple 2s linear infinite;
  }
  div:after {
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
</style>

<div on:click={handleNotification}>{notification ? 'x' : count}</div>
