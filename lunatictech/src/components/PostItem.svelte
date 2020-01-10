<script>
  export let thumbnail = "detektiv.jpg";
  import Author from "./Author.svelte";
  export let post;
</script>

<style>
  a {
    @apply flex border border-white py-2 px-5 my-5 cursor-pointer;
  }
  a:hover {
    transition: border 0.2s ease-out;
    @apply border-gray-200;
  }
  span {
    background-size: auto 100% !important;
    height: 120px;
    width: 120px;
    transition: all 0.2 ease-in-out;
    @apply rounded shadow-xl;
  }
  .content {
    @apply ml-5 flex flex-col justify-around;
  }
  li {
    @apply inline-block bg-gray-200 rounded px-2 py-0 text-sm font-semibold text-gray-700 mr-2;
  }
  h1 {
    @apply text-lg;
  }
</style>

<a rel="prefetch" href="blog/{post.slug}">
  <span style="background: url({thumbnail}) no-repeat center;" />
  <div class="content">
    <ul>
      <li># Movie</li>
      <li># Netflix</li>
      <li># 2020</li>
    </ul>
    <h1>{post.title}</h1>
    <Author />
  </div>
</a>
