<template>
  <div class="spy-mask">
    <div class="spy-mask__wrapper">
      <div class="spy-row spy-row--column" style="align-items: center">
        <div class="spy-mask-img"></div>
        <div>窥视：数据工厂</div>
        <div class="spy-mask-bar">
          <div class="spy-mask-bar--fill" :style="styles"></div>
        </div>
        <div>loading...</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'spy-mask',
  props: {
    loadingPercent: Number
  },
  computed: {
    styles() {
      return {
        width: `${this.loadingPercent}%`
      }
    }
  }
}
</script>