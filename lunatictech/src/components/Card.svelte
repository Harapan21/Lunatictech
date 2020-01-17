<script>
  import { panel_router, topic_active } from "../store";
  export let topic;
  export let key;
  export let thumbnail;
  export let name;
  export let rating = 3.1;
  export let year;
  import { onDestroy } from "svelte";
  import Icon from "./Icon.svelte";

  function handleClick() {
    topic_active.set({ topic, key, name, thumbnail, year });
    panel_router.set(2);
  }
  onDestroy(() => {
    if ($panel_router == 2) {
      panel_router.set(1);
    }
  });
</script>

<style>
  div {
    @apply rounded-lg relative overflow-hidden text-white  cursor-pointer select-none;
    width: 140px;
    height: 200px;
  }
  div:before {
    @apply absolute w-full h-full;
    content: "";
    background: linear-gradient(transparent, #000000);
  }
  section {
    transition: all 0.1s ease-in-out;
    @apply text-white absolute left-0 bottom-0 p-3 w-full;
  }
  section * {
    @apply text-base;
    font-family: var(--roboto);
    font-weight: 400;
  }
  ul,
  li {
    @apply flex items-center mr-2;
    font-size: 0.8rem;
  }
  ul {
    @apply w-full;
  }
  span {
    @apply mr-1;
    font-size: 0.5rem;
  }
  #yr {
    @apply border border-gray-100 rounded-sm px-1;
  }
</style>

<div
  on:click={handleClick}
  id={key}
  style="background: url({thumbnail}) no-repeat center; background-size: auto
  100%;">
  <section>
    <h1>{name}</h1>
    <ul>
      <li>
        <span>
          <Icon
            height={13}
            width={13}
            icon="star"
            opt={{ fill: 'yellow', 'stroke-width': 0 }} />
        </span>
        {rating}
      </li>
      <li>
        <span id="yr">{year}</span>
      </li>
    </ul>
  </section>
</div>
