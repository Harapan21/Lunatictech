<script>
  export let avatar = "faces.jpg";
</script>

<style>
  div {
    @apply flex items-center;
  }
  img {
    height: 30px;
    width: 30px;
    @apply rounded-sm;
  }
  h3 {
    font-family: var(--roboto);
    @apply ml-3;
    font-weight: 400;
  }
</style>

<div>
  <img src={avatar} />
  <h3>James McMahon</h3>
</div>
