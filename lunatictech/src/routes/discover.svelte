<script>
  import Search from "../components/Search.svelte";
  import Author from "../components/Author.svelte";
  export let imageurl = "dummy.jpg";
</script>

<style>
  div {
    @apply px-5 py-3 border-gray-100 sticky top-0 border-b-2;
  }
  #headline-post {
    height: 20rem;
    border-radius: 16px;
    @apply block p-0 overflow-hidden;
  }
  #headline-post::before {
    @apply absolute w-full h-full;
    content: "";
    background: linear-gradient(transparent, #000000);
  }
  section {
    @apply absolute inset-0 text-white z-10 w-full h-full;
  }
</style>

<svelte:head>
  <title>Discover</title>
</svelte:head>

<div>
  <Search />
</div>

<div>
  <div
    id="headline-post"
    style="background: url({imageurl}) no-repeat center;background-size:100%
    100%;">
    <section>
      <h1>Demonstran Hong Kong Demo Virtual di GTA V Online</h1>
      <Author />
    </section>
  </div>
</div>
