<script>
  import feather from "feather-icons";
  export let icon;
  export let width = 50;
  export let height = 50;
  export let opt = {};
</script>

{@html feather.icons[icon].toSvg({ width, height, ...opt })}
