<template>
  <div id="app" class="bg-gray-200 w-full h-screen">
    <div id="nav" class="absolute">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app{
  font-family: 'noto-regular', sans-serif;
}
</style>