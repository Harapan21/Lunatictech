<script>
  import Notification from "./Notification.svelte";
  export let avatar = "faces.jpg";
</script>

<style>
  #panel {
    @apply text-white w-1/5 rounded-l-lg p-5 relative overflow-hidden;
    background-color: var(--black);
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }
  .list {
    @apply overflow-hidden max-h-full;
  }
  h1 {
    @apply text-xl;
    font-family: var(--roboto);
    text-transform: uppercase;
    font-weight: 700;
  }
  h3 {
    @apply text-sm;
  }
  .item {
    @apply border border-transparent p-3 my-5 rounded cursor-pointer;
    transition: border 0.2s ease-in-out;
  }
  .item:hover {
    @apply border border-gray-300;
  }
  .menu {
    @apply flex items-center w-full p-3 justify-end;
  }
  .menu > * {
    height: 35px;
    width: 35px;
    background: var(--green);
    @apply rounded-lg ml-5 overflow-hidden relative flex items-center justify-center cursor-pointer shadow-xl select-none;
    transition: transfrom 0.2s;
  }
  img {
    @apply absolute w-full h-full;
  }
  span {
    transition: width 0.2s, height 0.2s;
  }
</style>

<div id="panel">
  <div class="menu">
    <Notification count={2} />
    <img alt="profile" src={avatar} />
  </div>

  <h1>Trending</h1>
  <div class="list">
    <div class="item">
      <h3>5 Cara Mati Paling Enggak Penting di Jumanji: The Next Level</h3>
    </div>
    <div class="item">
      <h3>5 Cara Mati Paling Enggak Penting di Jumanji: The Next Level</h3>
    </div>
    <div class="item">
      <h3>5 Cara Mati Paling Enggak Penting di Jumanji: The Next Level</h3>
    </div>
    <div class="item">
      <h3>5 Cara Mati Paling Enggak Penting di Jumanji: The Next Level</h3>
    </div>
    <div class="item">
      <h3>5 Cara Mati Paling Enggak Penting di Jumanji: The Next Level</h3>
    </div>
  </div>
</div>
