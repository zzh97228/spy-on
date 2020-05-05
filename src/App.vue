<template>
  <div id="app" data-app="true">
    <spy-mask></spy-mask>
    <main class="spy-content"></main>
    <spy-controller></spy-controller>
  </div>
</template>

<script>
import SpyMask from './components/SpyMask'
import SpyController from './components/SpyController'
export default {
  name: "App",
  components: {
    SpyMask,
    SpyController
  }
};
</script>

<style>
</style>
