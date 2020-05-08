<template>
  <main class="spy-content" ref="content" :style="mainStyle">
    <img class="spy-content__image" :src="red" />
    <img class="spy-content__image" :src="yellow" />
    <img class="spy-content__image" :src="red" />
    <img class="spy-content__image" :src="yellow" />
    <img class="spy-content__image" :src="red" />

    <spy-card
      v-for="(pos, i) in positions"
      :key="i"
      :top="pos.top"
      :left="pos.left"
      :content-width="state.elWidth"
      :left-boundary="state.leftBoundary"
      :right-boundary="state.rightBoundary"
    ></spy-card>
  </main>
</template>

<script>
import red from './assets/red.png'
import yellow from './assets/yellow.png'
import { computed, watch, reactive, onMounted } from 'vue'
import SpyCard from './components/SpyCard';
import { on, off, clamp } from './helpers'
const positions = Array.from(new Array(20), () => ({left: Math.random() * 100, top: Math.random() * 100}))
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
  data() {
    return {
      red,
      yellow,
      positions
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      contentEl: null,
      x: 0,
      leftBoundary: 0,
      rightBoundary: 0,
      atLeftBoundary: false,
      atRightBoundary: false,
      moveX: 0,
      left: 0,
      percent: 0,
      elWidth: 0
    })
    const mainStyle = computed(() => {
      return {
        transform: `translateX(${state.moveX}px)`
      }
    })

    function move(toLeft = false) {
      if (!state.contentEl) return
      
      const elWidth =state.elWidth = state.contentEl.offsetWidth
      state.left = state.contentEl.getBoundingClientRect().left;

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
    function setPercentAndBoundary(left) {
      if (!state.contentEl) return
      const elWidth = state.elWidth
      const windowWidth = window.innerWidth || document.documentElement.offsetWidth

      state.percent = clamp(Math.round(Math.abs((left / (4 * elWidth / 5)) * 100)), 0 , 100)
      state.leftBoundary = Math.abs(left) / state.contentEl.offsetWidth * 100
      state.rightBoundary = (Math.abs(left) + windowWidth) / state.contentEl.offsetWidth * 100
      emit('update:left', { left, leftBoundary: state.leftBoundary, rightBoundary: state.rightBoundary })

    }

    watch(() => state.x, () => {
      if (state.atLeftBoundary === true) {
        requestAnimationFrame(()=> {
          move(true)
        })
      } else if (state.atRightBoundary === true) {
        requestAnimationFrame(()=> {
          move()
        })
      }
    })
    watch(() => state.left, (left) => {
      setPercentAndBoundary(left)
    })
    watch(() => state.percent, (val) => {
      emit('update:percent', val)
    })

    onMounted(() => {
        if (!state.contentEl) return
        state.left = state.contentEl.getBoundingClientRect().left
        setPercentAndBoundary(state.left)
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