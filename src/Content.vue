<template>
  <main class="spy-content" ref="content" :style="mainStyle">
    <teleport to="#app">
      <div class="spy-content__activator left" ref="leftActivator"></div>
    </teleport>
    <teleport to="#app">
      <div class="spy-content__activator right" ref="rightActivator"></div>
    </teleport>
    <img
      class="spy-content__image"
      v-for="(item, i) in pictures"
      :key="i"
      :src="item"
      v-on:load="onLoad"
    />
    <spy-card
      v-for="(pos, i) in positions"
      :key="i"
      :width="pos.width"
      :height="pos.height"
      :top="pos.top"
      :left="pos.left"
      :content-top="pos.contentTop"
      :content-left="pos.contentLeft"
      :content-width="state.elWidth"
      :left-boundary="state.leftBoundary"
      :right-boundary="state.rightBoundary"
      @hovercard:emits="hoverCard"
    >
      <keep-alive>
        <component
          v-if="pos.isImage"
          :is="'SpyImage'"
          :src="pos.src"
          :width="pos.mediaWidth"
          @loaded="onLoad"
        ></component>
        <component v-else :is="pos.compo"></component>
      </keep-alive>
    </spy-card>

    <div class="spy-back" :style="backStyle"></div>
  </main>
</template>

<script>
import { computed, watch, reactive } from 'vue'
import SpyCard from './components/SpyCard';
import SpyImage from './components/SpyImage';
import { on, off, pos as positions, convertToUnit } from './helpers'
import * as details from './components/details';
// const positions = Array.from(new Array(20), () => ({left: Math.random() * 100, top: Math.random() * 100}))
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
    },
    disabled: Boolean
  },
  components: {
    SpyCard,
    SpyImage,
    ...details
  },
  data() {
    return {
      pictures: [
        'https://cdn.lagabu.com/factory/factory-1.png',
        'https://cdn.lagabu.com/factory/factory-2.png',
        'https://cdn.lagabu.com/factory/factory-3.png',
        'https://cdn.lagabu.com/factory/factory-4.png',
        'https://cdn.lagabu.com/factory/factory-5.png',

      ],
      pictureCounts: 0,
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
      elWidth: 0,
      imageHeight: 0
    })
    const backStyle = computed(() => {
      const imageWidth = state.imageHeight * 16 / 9
      return {
        'background-position-x': `0, ${convertToUnit(imageWidth)}, ${convertToUnit(imageWidth * 2)}, ${convertToUnit(imageWidth * 3)}, ${convertToUnit(imageWidth * 4)}`

      }
    })
    const mainStyle = computed(() => {
      
      return {
        transform: `translateX(${state.moveX}px)`,
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

    watch(() => props.disabled, (val) => {
      if (!val) {
        if (!state.contentEl) return
        state.elWidth = state.contentEl.offsetWidth
        state.left = state.contentEl.getBoundingClientRect().left
        setPercentAndBoundary(state.left)
      }
    })
    // onMounted(() => {
    //   nextTick(() => {
    //     if (!state.contentEl) return
    //     state.elWidth = state.contentEl.offsetWidth
    //     state.left = state.contentEl.getBoundingClientRect().left
    //     setPercentAndBoundary(state.left)
    //   })
    // })
    return {
      mainStyle,
      backStyle,
      state
    }
  },
  mounted() {
    this.addEventListner()
    this.state.imageHeight = document.querySelector('.spy-content__image').offsetHeight
  },
  beforeUnmount() {
    this.removeEventListner()
  },
  watch: {
    pictureCounts(val) {
      const totalCount = this.pictures.length + this.positions.filter(p => p.isImage).length
            console.log(totalCount)

      this.$emit('loading', { value: val, totalCount })
    }
  },
  methods: {
    hoverCard(left) {
      console.log(left)
    },
    onLoad() {
      this.pictureCounts += 1
    },
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