<script>
  export let avatar = "faces.jpg";
  export let createdAt = "29 October 2019";
  export let name = "James McMahon";
</script>

<style>
  div {
    @apply flex items-center;
  }
  img {
    height: 30px;
    width: 30px;
    @apply rounded-lg;
  }
  span {
    display: flex;
    flex-direction: column;
    @apply ml-3;
  }
  h3 {
    font-family: var(--roboto);
    font-weight: 400;
  }
  p {
    font-size: 0.8rem;
  }
</style>

<div>
  <img alt={name} src={avatar} />
  <span>
    <h3>{name}</h3>
    <p>Published on {createdAt}</p>
  </span>
</div>
