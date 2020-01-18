<script>
  import { topic_active } from "../store";
  import Card from "./Card.svelte";
  console.log($topic_active);
</script>

<div>
  <h1>topic</h1>
  <Card {...$topic_active} />
</div>
