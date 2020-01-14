<script>
  import CommentItem from "./CommentItem.svelte";
</script>

<style>
  div {
    @apply rounded my-3 relative shadow-xl overflow-hidden cursor-pointer;
    background: #ffffff;
    color: var(--black);
  }
  h3 {
    @apply text-sm p-2;
    font-family: var(--roboto);
    font-weight: 400;
  }
  span {
    @apply block text-center p-2 capitalize text-sm;
  }
</style>

<div>
  <h3>6 Tayangan Netflix yang Jadi Nomine Golden Globe 2020</h3>
  <CommentItem />
  <span>more</span>
</div>
