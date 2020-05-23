<template>
  <div class="spy-image">
    <img :src="src" alt v-on:load="onLoad" />
  </div>
</template>
<script>
import { convertToUnit } from '../helpers'
export default {
  name: 'SpyImage',
  props: {
    width: [String, Number],
    src: [String]
  },
  computed: {
    styles() {
      return {
        width: convertToUnit(this.width),
      }
    }
  },
  methods: {
    onLoad() {
      this.$emit('loaded', true)
    }
  }
}
</script>