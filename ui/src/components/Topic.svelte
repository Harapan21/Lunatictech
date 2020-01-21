<script>
  import { topic_active } from "../store";
  const { topic, name, thumbnail, year, key, rating } = $topic_active;
</script>

<style>
  section {
    @apply flex my-5;
  }
  div.thumbnail {
    @apply rounded-lg shadow-2xl;
    background-size: auto 100% !important ;
    width: 140px;
    height: 200px;
    transition: all 0.2s ease-in-out;
  }
  div.thumbnail:hover {
    background-size: auto 120% !important;
  }
  span {
    @apply ml-5;
  }
  h1 {
    @apply text-3xl;
    font-family: var(--roboto);
    font-size: 700;
  }
  h3 {
    @apply text-base;
    font-family: var(--roboto);
    font-size: 700;
  }
</style>

<section>
  <div
    class="thumbnail"
    style="background: url({thumbnail}) no-repeat center;" />
  <span>
    <h1>{name}</h1>
    <h3>({year})</h3>
  </span>

</section>
