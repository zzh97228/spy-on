<template>
  <footer class="spy-controller__wrapper">
    <div class="spy-controller">
      <div class="spy-controller--logo"></div>
      <div class="spy-controller--content" ref="progress" @click="updateProgress">
        <div class="spy-controller--fill" :style="{width: `${percentage}%`}"></div>
      </div>
      <div class="spy-controller--actions">
        <div v-for="i in 4" :key="i" class="spy-controller--icon">
          <i class="spy-icon fa fas fa-image"></i>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'spy-controller',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      percentage: this.percent
    }
  },
  watch: {
    percent(val) {
      if (val === this.percentage) return 
      this.percentage = val
    }
  },
  methods: {
    updateProgress(e) {
      const x = e.clientX
      const progress = this.$refs['progress'];
      const rect = progress.getBoundingClientRect();
      this.percentage = Math.round(((x - rect.x) / rect.width) * 100)
      this.$emit('update:internalPercent', this.percentage)
    }
  }
  
}
</script>