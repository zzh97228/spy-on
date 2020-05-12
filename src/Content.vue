<template>
  <main class="spy-content" ref="content" :style="mainStyle">
    <teleport to="#app">
      <div class="spy-content__activator left" ref="leftActivator"></div>
    </teleport>
    <teleport to="#app">
      <div class="spy-content__activator right" ref="rightActivator"></div>
    </teleport>

    <img class="spy-content__image" :src="pic1" />
    <img class="spy-content__image" :src="pic2" />
    <img class="spy-content__image" :src="pic3" />
    <img class="spy-content__image" :src="pic4" />
    <img class="spy-content__image" :src="pic5" />

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
import pic1 from './assets/1.png';
import pic2 from './assets/2.png';

import pic3 from './assets/3.png';

import pic4 from './assets/4.png';

import pic5 from './assets/5.png';
import { computed, watch, reactive, onMounted } from 'vue'
import SpyCard from './components/SpyCard';
import { on, off } from './helpers'
const positions = Array.from(new Array(20), () => ({left: Math.random() * 100, top: Math.random() * 100}))
export default {
  name: 'spy-content',
  props: {
    stepLength: {
      type: [String, Number],
      default: 5
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  components: {
    SpyCard
  },
  data() {
    return {
      pic1,
      pic2,
      pic3,
      pic4,
      pic5,
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
      const elWidth = state.elWidth || state.contentEl.offsetWidth
      const windowWidth = window.innerWidth || document.documentElement.offsetWidth

      state.percent = Math.round(Math.abs(left * 100 / (elWidth - windowWidth)))
      state.leftBoundary = Math.abs(left) / state.contentEl.offsetWidth * 100
      state.rightBoundary = (Math.abs(left) + windowWidth) / state.contentEl.offsetWidth * 100
      emit('update:left', { left, leftBoundary: state.leftBoundary, rightBoundary: state.rightBoundary })

    }
    watch(() => props.percentage, (val) => {
      if (val === state.percent) return
      if (!state.contentEl) return
      const windowWidth = window.innerWidth || document.documentElement.offsetWidth

      state.moveX = Math.round(-(state.contentEl.offsetWidth - windowWidth) * val / 100)
      requestAnimationFrame(()=> {
      state.left = state.contentEl.getBoundingClientRect().left;
      })

    })
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
    setAtBoundary(left = false, right = false) {
      this.state.atLeftBoundary = left
      this.state.atRightBoundary = right
    },
    onMouseEnter(e) {
      const x = e.clientX;

      const windowWidth = window.innerWidth || document.documentElement.offsetWidth
      const leftBoundary = windowWidth * 0.1;
      const rightBoundary = windowWidth * 0.9;
      
      if (x < leftBoundary) {
        this.state.x = x
        this.setAtBoundary(true, false)

      } else if (x > rightBoundary) {
        this.setAtBoundary(false, true)
        this.state.x = x
      } else {
        this.setAtBoundary(false, false)
      }

    },
    onMouseMove() {
      // const x = e.clientX;
      // const windowWidth = window.innerWidth || document.documentElement.offsetWidth
      // const leftBoundary = windowWidth * 0.1;
      // const rightBoundary = windowWidth * 0.9;
      
      // if (x < leftBoundary) {
      //   this.state.x = x
      //   this.state.atLeftBoundary = true
      //   this.state.atRightBoundary = false

      // } else if (x > rightBoundary) {
      //   this.state.atRightBoundary = true
      //   this.state.atLeftBoundary = false
      //   this.state.x = x
      // } else {
      //   this.state.atLeftBoundary = false
      //   this.state.atRightBoundary = false
      // }
    },
    onMouseLeave() {
      this.setAtBoundary(false, false)
    },
    resize() {

    },
    addEventListner() {
      const el = this.$refs['content']
      const left = this.$refs['leftActivator']
      const right = this.$refs['rightActivator']

      this.state.contentEl = el;
      // on(el, 'mouseenter', this.onMouseEnter )
      // on(el, 'mousemove', this.onMouseMove)
      // on(el, 'mouseleave', this.onMouseLeave)
      on(left, 'mouseenter', this.onMouseEnter )
      on(left, 'mouseleave', this.onMouseLeave)
      on(right, 'mouseenter', this.onMouseEnter )
      on(right, 'mouseleave', this.onMouseLeave)

      on(window, 'resize', this.resize)
    },
    removeEventListner() {
      // const el = this.$refs['content']
      // off(el, 'mouseenter', this.onMouseEnter )
      // off(el, 'mousemove', this.onMouseMove)
      // off(el, 'mouseleave', this.onMouseLeave)
      const left = this.$refs['leftActivator']
      const right = this.$refs['rightActivator']

      off(left, 'mouseenter', this.onMouseEnter )
      off(left, 'mouseleave', this.onMouseLeave)
      off(right, 'mouseenter', this.onMouseEnter )
      off(right, 'mouseleave', this.onMouseLeave)

      off(window, 'resize', this.resize)

    }
  }
}
</script>