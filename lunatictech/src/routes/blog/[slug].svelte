<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import CategoryBadgeList from "../../components/CategoryBadgeList.svelte";
  export let thumbnail = "detektiv.jpg";
  export let post;
  let category = ["Movie", "Netflix", "2020"];
  import { active_post } from "../../store";
  onMount(() => {
    active_post.set(post);
  });
  onDestroy(() => active_post.set());
</script>

<style>
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
  span h1 {
    @apply text-3xl mt-3;
  }
  span {
    @apply py-4 block  flex-col;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>
<img src={thumbnail} />
<span>
  <CategoryBadgeList {category} />
  <h1>{post.title}</h1>
</span>
<div class="content">
  {@html post.html}
</div>
