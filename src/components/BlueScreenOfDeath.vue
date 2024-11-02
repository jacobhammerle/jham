<template>
    <div class="blue-screen-of-death mx-auto h-screen w-screen flex justify-center items-center w-full text-white">
      <div class="p-20">
        <div class="frowny-face">:(</div>
        <h1 class="text-2xl pt-3">You've run into a problem… and it's the Blue Team. We're just collecting some points, and then we'll beat you.</h1>
        <h1 class="text-2xl pt-3">69% complete</h1>
        <h1 class="text-md pt-3">For more information about this issue and possible fixes, please <a class="capitalize underline" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">visit our website</a>.</h1>
      </div>
    </div>
  </template>
  
<script>
    export default {
        name: 'blueScreenOfDeath',
        components: {
  
        }
    }
</script>

<style lang="css">
.blue-screen-of-death {
    background-color: #0078D7;
    font-family: "Noto Sans", sans-serif;

    .frowny-face {
        font-size: 120px;
    }
}
</style>