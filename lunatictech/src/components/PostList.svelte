<script>
  import PostItem from "./PostItem.svelte";
  export let posts;
</script>

{#each posts as post}
  <PostItem {post} />
{/each}
