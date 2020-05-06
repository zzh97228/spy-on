<template>
  <main class="spy-content" ref="content" :style="mainStyle">
    <spy-card top="50%" left="50%"></spy-card>
  </main>
</template>

<script>
import { computed, watch, reactive } from 'vue'
import SpyCard from './components/SpyCard';
import { on, off } from './helpers'
export default {
  name: 'spy-content',
  props: {
    stepLength: {
      type: [String, Number],
      default: 0.5
    }
  },
  components: {
    SpyCard
  },
  setup(props) {
    const state = reactive({
      contentEl: null,
      x: 0,
      atLeftBoundary: false,
      atRightBoundary: false,
      moveX: 0
    })
    const mainStyle = computed(() => {
      return {
        transform: `translateX(${state.moveX}px)`
      }
    })

    function move(toLeft = false) {
      if (!state.contentEl) return
      
      const elWidth = state.contentEl.offsetWidth
      const windowWidth = window.innerWidth || document.documentElement.offsetWidth
      const stepLength = +props.stepLength
      const isLessBoundary = toLeft ? state.moveX < 0 : (windowWidth -state.moveX) < elWidth
      if (state.atRightBoundary && isLessBoundary) {
        state.moveX = state.moveX - stepLength

        requestAnimationFrame(() => {
          move(toLeft)
        })
      } else if (state.atLeftBoundary && isLessBoundary) {
        state.moveX = state.moveX + stepLength
        requestAnimationFrame(() => {
          move(toLeft)
        })
      }
    }

    watch(() => state.x, () => {
      if (state.atLeftBoundary === true) {
        requestAnimationFrame(()=> {
          move(true)
        })
      } else if (state.atRightBoundary === true) {
        // console.log(val)
        requestAnimationFrame(()=> {
          move()
        })
      }
    })
    return {
      mainStyle,
      state
    }
  },
  mounted() {
    this.addEventListner()
  },
  beforeUnmount() {
    this.removeEventListner()
  },
  methods: {
    onMouseEnter() {
      console.log('mouseenter')
    },
    onMouseMove(e) {
      const x = e.clientX;
      const windowWidth = window.innerWidth || document.documentElement.offsetWidth
      const leftBoundary = windowWidth * 0.1;
      const rightBoundary = windowWidth * 0.9;
      
      if (x < leftBoundary) {
        this.state.x = x
        this.state.atLeftBoundary = true
        this.state.atRightBoundary = false

      } else if (x > rightBoundary) {
        this.state.atRightBoundary = true
        this.state.atLeftBoundary = false
        this.state.x = x
      } else {
        this.state.atLeftBoundary = false
        this.state.atRightBoundary = false
      }
    },
    onMouseLeave() {
      this.state.atLeftBoundary = false
      this.state.atRightBoundary = false
      console.log('mouseleave')
    },
    resize() {

    },
    addEventListner() {
      const el = this.$refs['content']
      this.state.contentEl = el;
      on(el, 'mouseenter', this.onMouseEnter )
      on(el, 'mousemove', this.onMouseMove)
      on(el, 'mouseleave', this.onMouseLeave)
      on(window, 'resize', this.resize)
    },
    removeEventListner() {
      const el = this.$refs['content']
      off(el, 'mouseenter', this.onMouseEnter )
      off(el, 'mousemove', this.onMouseMove)
      off(el, 'mouseleave', this.onMouseLeave)
      off(window, 'resize', this.resize)

    }
  }
}
</script>