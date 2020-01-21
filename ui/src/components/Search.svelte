<style>
  input {
    @apply border-2 border-white appearance-none rounded-lg  w-full py-2 px-4 text-gray-700 leading-tight;
    background-color: #f0fff2;
  }
  input:focus {
    @apply outline-none bg-white border-gray-100 shadow;
  }
  input:before {
    content: "";
    @apply absolute top-0 left-0 bg-black w-full h-full;
  }
</style>

<input placeholder="Search" />
