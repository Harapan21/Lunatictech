<script>
  import Star from "../components/Star.svelte";
  export let rating;
  let rating_group = [];
</script>

<style>
  form {
    @apply flex justify-between;
  }
  form div {
    @apply relative cursor-pointer;
  }
  input {
    @apply absolute top-0 w-full h-full opacity-0;
  }
  input:checked ~ svg {
    color: yellowgreen !important;
  }
</style>

<form>
  <div>
    <input type="checkbox" bind:group={rating_group} value={1} />
    <Star />
  </div>
  <div>
    <input type="checkbox" bind:group={rating_group} value={2} />
    <Star />
  </div>
  <div>
    <input type="checkbox" bind:group={rating_group} value={3} />
    <Star />
  </div>
  <div>
    <input type="checkbox" bind:group={rating_group} value={4} />
    <Star />
  </div>
  <div>
    <input type="checkbox" bind:group={rating_group} value={5} />
    <Star />
  </div>
</form>
