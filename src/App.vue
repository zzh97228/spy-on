<template>
  <div id="app" data-app="true">
    <spy-mask></spy-mask>
    <spy-content v-on:update:percent="updatePercent" v-on:update:left="updateLeft"></spy-content>
    <spy-controller :percent="percent"></spy-controller>
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
  },
  data() {
    return {
      percent: 0
    }
  },
  methods: {
    updatePercent(val) {
      this.percent = val
    },
    updateLeft() {
    }
  }
};
</script>

<style>
</style>
