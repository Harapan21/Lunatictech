<script>
  import NotificationItem from "./NotificationItem.svelte";
</script>

<style>
  div {
    @apply overflow-y-scroll  w-auto mt-5 relative max-h-full;
    scrollbar-width: none;
  }

  div::-webkit-scrollbar {
    display: none;
  }
</style>

<div>
  <NotificationItem />
  <NotificationItem />
  <NotificationItem />
  <NotificationItem />
</div>
