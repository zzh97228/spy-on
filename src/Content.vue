<template>
  <main class="spy-content" ref="content" :style="mainStyle">
    <teleport to="#app">
      <div class="spy-content__activator left" ref="leftActivator"></div>
    </teleport>
    <teleport to="#app">
      <div class="spy-content__activator right" ref="rightActivator"></div>
    </teleport>
    <div :class="wrapperClasses(i)" v-for="(item, i) in pictures" :key="i" :style="imgWrapperStyle">
      <img class="spy-content__image" :src="item" :ref="`img-${i}`" v-on:load="onLoad" />
    </div>

    <spy-card
      v-for="(pos, i) in positions"
      :current-idx="currentIdx"
      :key="i"
      :idx="i"
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
      @hovercard:leave="hoverCardLeave"
    >
      <!-- <keep-alive> -->
      <component
        v-if="pos.isImage"
        :is="'SpyImage'"
        :src="pos.src"
        :width="pos.mediaWidth"
        @loaded="onLoad"
      ></component>
      <component v-else :is="pos.compo"></component>
      <!-- </keep-alive> -->
    </spy-card>
  </main>
</template>

<script>
import { computed, watch, reactive, toRef } from 'vue'
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
      positions,
      filtering: false,
      currentIdx: -1
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
      imageHeight: 0,
      imageWidth: 0,
      hoverImageIdx: -1,
      hoverLeft: 0,
      hoverTop: 0,
      hoverWidth: 0,
      hoverHeight: 0
    })
    const imgWrapperStyle = computed(() => {
      return {
        width: convertToUnit(state.imageWidth),
        height: convertToUnit(state.imageHeight)
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
      imgWrapperStyle,
      mainStyle,
      state,
      hoverImageIdx: toRef(state, 'hoverImageIdx')
    }
  },
  computed: {
    wrapperClasses() {
      return (idx) => {
        return {
          'spy-content__image--wrapper': true,
          'spy-content__image--wrapper-filter': this.filtering,
          [`spy-content__image--wrapper-pic${idx}`]: idx !== undefined
        }
      }
    },
    showCard() {
      if (this.currentIdx < 0) return () => true
      return (val) => val === this.currentIdx
    }
  },
  mounted() {
    this.addEventListner()
    this.state.imageHeight = document.querySelector('.spy-content__image').offsetHeight
    this.state.imageWidth = this.state.imageHeight * 16 / 9
  },
  beforeUnmount() {
    this.removeEventListner()
  },
  watch: {
    pictureCounts(val) {
      const totalCount = this.pictures.length + this.positions.filter(p => p.isImage).length
      this.$emit('loading', { value: val, totalCount })
    },
    hoverImageIdx(idx) {
      if (idx < 0)  {
        this.pictures.forEach((_, index) => {
          const el = this.$refs[`img-${index}`]
          if (!el) return
          el.style.setProperty('clip', 'unset')
          el.style.setProperty('visibility', '')

        })
        this.filtering = false

        return
      }
      const el = this.$refs[`img-${idx}`]
      if (!el) return
      const left = this.state.hoverLeft,
       top = this.state.hoverTop,
       width = this.state.hoverWidth,
       height = this.state.hoverHeight;
       // 默认使用vh单位
      const y1 = top - (height * window.innerHeight / 2)/ 100,
        x1 = left + (width * window.innerHeight / 2) / 100,
        y2 = top + (height * window.innerHeight / 2)/ 100,
        x2 = left - (width * window.innerHeight / 2) / 100
      const clip = `rect(${y1}px, ${x1}px, ${y2}px, ${x2}px)`
      el.style.setProperty('clip', clip)
      this.pictures.forEach((_, index)=> {
          const el = this.$refs[`img-${index}`]
          if (!el || index === idx) return
          el.style.setProperty('visibility', 'hidden')
      })
      this.filtering = true
    }
  },
  methods: {
    hoverCardLeave() {
      this.currentIdx = -1
      this.state.hoverImageIdx = -1
    },
    hoverCard({left, top, width, height, idx}) {
      this.currentIdx = idx
      const img = document.querySelector('.spy-content__image')
      const imgWidth = img.offsetWidth
      if (!imgWidth) return
      const currLeft = left * this.state.elWidth / 100
      const imgIdx = Math.ceil(currLeft / imgWidth) - 1
      const imgLeft = currLeft % imgWidth

      this.state.hoverImageIdx = imgIdx
      this.state.hoverLeft = imgLeft
      this.state.hoverTop = top * this.state.imageHeight / 100
      this.state.hoverWidth = parseInt(width)
      this.state.hoverHeight = parseInt(height)
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