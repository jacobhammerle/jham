<template>
  <div id="app" class="bg-gray-200 w-full h-screen">
    <div id="nav" class="absolute w-full text-center p-5">
      <router-link class="text-lg p-5" to="/">Home</router-link> |
      <router-link class="text-lg p-5" to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app{
  font-family: 'lato-regular', sans-serif;
}
.lato-bold{
  font-family: 'lato-bold', sans-serif;
}
.lato-regular{
  font-family: 'lato-regular', sans-serif;
}
.lato-light{
  font-family: 'lato-light', sans-serif;
}
</style>