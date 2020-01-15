<script>
  export let key;
  export let thumbnail;
  export let name;
  export let rating = 3.1;
  export let year;
  import Icon from "./Icon.svelte";
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
  div:hover section span {
    @apply text-base opacity-100 static;
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
    transition: position 0.1s ease-in-out;
    @apply flex items-center text-sm opacity-0 absolute;
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
      <Icon
        height={10}
        width={10}
        icon="star"
        opt={{ fill: 'yellow', 'stroke-width': 0 }} />
      {rating}
    </span>
  </section>
</div>
