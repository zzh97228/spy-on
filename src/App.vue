<template>
  <div id="app" data-app="true">
    <spy-mask></spy-mask>
    <spy-content></spy-content>
    <spy-controller></spy-controller>
  </div>
</template>

<script>
import SpyMask from './components/SpyMask'
import SpyController from './components/SpyController'
import SpyContent from './Content'
export default {
  name: "App",
  components: {
    SpyMask,
    SpyController,
    SpyContent
  }
};
</script>

<style>
</style>
