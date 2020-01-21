<script>
  import NotificationItem from "./NotificationItem.svelte";
  let notif = [
    {
      id: 1,
      post: "6 Tayangan Netflix yang Jadi Nomine Golden Globe 2020",
      more: false,
      comment: {
        avatar: "faces.jpg",
        createdAt: "today"
      }
    },
    {
      id: 2,
      post: "6 Tayangan Netflix yang Jadi Nomine Golden Globe 2020",
      more: false,
      comment: {
        avatar: "faces.jpg",
        createdAt: "today"
      }
    },
    {
      id: 3,
      post: "6 Tayangan Netflix yang Jadi Nomine Golden Globe 2020",
      more: false,
      comment: {
        avatar: "faces.jpg",
        createdAt: "today"
      }
    },
    {
      id: 4,
      post: "6 Tayangan Netflix yang Jadi Nomine Golden Globe 2020",
      more: false,
      comment: {
        avatar: "faces.jpg",
        createdAt: "today"
      }
    }
  ];
  function handleScroll(event) {
    console.log(event);
  }
</script>

<style>
  div {
    @apply overflow-y-auto overflow-x-hidden  w-auto mt-5 mb-48 relative max-h-full;
    scrollbar-width: none;
  }

  div::-webkit-scrollbar {
    display: none;
  }
</style>

<div on:scroll={handleScroll}>
  {#each notif as item, i (item.id)}
    <NotificationItem content={item} id={i} />
  {/each}
</div>
