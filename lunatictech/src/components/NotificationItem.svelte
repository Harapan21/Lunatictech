<script>
  import CommentItem from "./CommentItem.svelte";
  import { fly } from "svelte/transition";
  import Icon from "./Icon.svelte";
  export let id;
  export let content;
</script>

<style>
  div {
    @apply rounded my-3 relative shadow-xl overflow-hidden cursor-pointer select-none relative;
    background: #ffffff;
    color: var(--black);
    transition: transform 0.2s ease-in-out;
  }
  div:active {
    transform: scale(0.95);
  }
  h3 {
    @apply text-sm;
    font-family: var(--roboto);
    font-weight: 400;
  }
  #more {
    @apply block text-center p-2 capitalize text-sm;
  }
  #head > * {
    @apply p-2;
  }
  #head {
    @apply p-3 flex items-center;
  }
  #head span {
    @apply rounded-full;
    transition: background 0.1s ease-in-out;
  }
  #head span:hover {
    @apply bg-gray-200;
  }
</style>

<div {id} in:fly>
  <span id="head">
    <h3>{content.post}</h3>
    <span>
      <Icon width={15} height={15} icon="trash" />
    </span>
  </span>
  <CommentItem {...content.comment} />
  {#if content.more}
    <span id="more">more</span>
  {/if}
</div>
