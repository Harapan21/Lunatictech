<script context="module">
  import { client } from "../graphql/client";
  import { POSTLIST } from "../graphql/query/post";
  export async function preload() {
    return {
      post: await client.query({
        query: POSTLIST
      })
    };
  }
</script>

<script>
  export let post;
</script>

<svelte:head>
  <title>Lunatictech</title>
</svelte:head>
<div class="mx-auto">
  <div class="flex mb-4">
    <div class="w-1/2 bg-gray-400 h-12">s</div>
    <div class="w-1/2 bg-gray-500 h-12">s</div>
  </div>
</div>
