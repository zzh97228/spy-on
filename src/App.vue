<template>
  <div id="app" data-app="true">
    <spy-mask v-show="!loaded" :loading-percent="loadingPercent"></spy-mask>
    <spy-content
      v-on:update:percent="updatePercent"
      :percentage="percent"
      v-on:update:left="updateLeft"
      v-on:loading="onLoading"
    ></spy-content>
    <spy-controller :percent="percent" v-on:update:internalPercent="updatePercent"></spy-controller>
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
      percent: 0,
      loadingPercent: 0,
      loaded: false
    }
  },
  methods: {
    updatePercent(val) {
      this.percent = val
    },
    onLoading({ value, totalCount }) {
      this.loadingPercent = value * 100 / totalCount
      if (value === totalCount) {
        setTimeout(() => {
          this.loaded = true
        }, 2000)
      }
    },
    updateLeft() {
    }
  }
};
</script>

<style>
</style>
