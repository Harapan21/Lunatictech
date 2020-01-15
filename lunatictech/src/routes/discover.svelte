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
  import PostList from "../components/PostList.svelte";
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
    @apply cursor-pointer text-white absolute left-0 bottom-0 p-5 w-full;
  }

  section:hover h1 {
    @apply text-2xl;
  }

  h1 {
    @apply text-xl pb-5 pt-2;
    transition: font-size 0.1s ease-in-out;
  }
  span {
    @apply border border-white rounded px-3 text-white;
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
      <span>headline</span>
      <h1>Demonstran Hong Kong Demo Virtual di GTA V Online</h1>
      <Author />
    </section>
  </div>
  <PostList {posts} />
</div>
