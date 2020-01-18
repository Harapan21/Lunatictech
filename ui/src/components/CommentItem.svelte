<script>
  import Author from "./Author.svelte";
  export let avatar = "faces.jpg";
  export let createdAt = "today";
</script>

<style>
  div {
    @apply px-3 py-2 border-t border-gray-200;
    color: var(--black);
  }
  p {
    @apply mt-3;
  }
</style>

<div>
  <Author {avatar} {createdAt} />
  <p>Cool article</p>
</div>
