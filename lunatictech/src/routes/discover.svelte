<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import Author from "../components/Author.svelte";
  import PostItem from "../components/PostItem.svelte";
  export let posts;
  export let imageurl = "dummy.jpg";
</script>

<style>
  .discover {
    @apply px-5 mt-3;
  }
  #headline-post {
    height: 20rem;
    border-radius: 16px;
    transition: background-size 0.2s ease-in-out;
    @apply p-0 overflow-hidden relative shadow-xl;
  }
  #headline-post:before {
    @apply absolute w-full h-full;
    content: "";
    background: linear-gradient(transparent, #000000);
  }

  section {
    transition: padding 0.2s ease-in-out;
    @apply cursor-pointer text-white absolute left-0 bottom-0 p-5 w-full;
  }

  section:hover {
    @apply pb-10;
  }

  h1 {
    @apply text-2xl py-5;
  }
</style>

<svelte:head>
  <title>Discover</title>
</svelte:head>

<div class="discover">
  <div
    id="headline-post"
    style="background: url({imageurl}) no-repeat center; background-size: 100%
    100%;">
    <section>
      <h1>Demonstran Hong Kong Demo Virtual di GTA V Online</h1>
      <Author />
    </section>
  </div>
  <div class="post-item">
    {#each posts as post}
      <PostItem {post} />
    {/each}
  </div>
</div>
