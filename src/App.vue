<template>
  <div id="app" class="bg-light-blue-50 flex w-full">
    <div id="nav" class="absolute inset-x-0 mx-auto flex-1 text-center p-5">
        <router-link class="lg:text-lg md:text-md sm:text-sm p-5" to="/">Home</router-link> |
        <router-link class="lg:text-lg md:text-md sm:text-sm p-5" to="/projects">Projects</router-link> |
        <router-link class="lg:text-lg md:text-md sm:text-sm p-5" to="/about">About</router-link>
    </div>
    <router-view class="mx-8" />
  </div>
</template>

<style>
#app{
  font-family: 'lato-regular', sans-serif;
}
.router-link-exact-active{
  text-decoration: underline;
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