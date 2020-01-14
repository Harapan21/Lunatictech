<script>
  export let key;
  export let thumbnail;
  export let name;
  export let rating = 5.0;
  export let year;
  import Star from "./Star.svelte";
</script>

<style>
  div {
    max-width: 140px;
    max-height: 200px;
    @apply rounded-lg relative w-full h-full overflow-hidden text-white;
  }
  div:before {
    @apply absolute w-full h-full;
    content: "";
    background: linear-gradient(transparent, #000000);
  }
  div:hover section {
    @apply pb-8;
  }
  section {
    transition: all 0.1s ease-in-out;
    @apply cursor-pointer text-white absolute left-0 bottom-0 p-3 w-full;
  }
  section * {
    @apply text-base;
    font-family: var(--roboto);
    font-weight: 400;
  }
  img {
    @apply absolute top-0 left-0 right-0 bottom-0 w-full h-full;
  }
  span {
    @apply flex items-center text-base;
  }
</style>

<div
  id={key}
  style="background: url({thumbnail}) no-repeat center; background-size: 100%
  100%;">
  <section>
    <h1>{name}</h1>
    <h3>{year}</h3>
    <span>
      <Star checked height={10} width={10} />
      {rating}
    </span>
  </section>
</div>
