<template>
  <teleport to="#app">
    <transition name="fade-opacity">
      <div
        v-show="canShow"
        class="spy-card"
        @mouseenter="showCard"
        @mouseleave="hideCard"
        @click="clickCard"
        :style="{...cardStyle}"
      >
        <transition name="fade-opacity-transform">
          <div v-show="state.showContent" class="spy-card-content">
            <div class="spy-card-content__wrapper" ref="content" :style="contentStyle">
              <slot></slot>
            </div>
          </div>
        </transition>

        <div class="spy-card-media">
          <div class="spy-card-media__wrapper" :style="sizeStyle">
            <svg
              t="1589978743563"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1278"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="200"
              height="200"
            >
              <defs>
                <style type="text/css" />
              </defs>
              <path
                d="M512 170.666667C298.666667 170.666667 116.48 303.36 42.666667 490.666667 116.48 677.973333 298.666667 810.666667 512 810.666667s395.52-132.693333 469.333333-320C907.52 303.36 725.333333 170.666667 512 170.666667z m0 533.333333c-117.76 0-213.333333-95.573333-213.333333-213.333333s95.573333-213.333333 213.333333-213.333334 213.333333 95.573333 213.333333 213.333334-95.573333 213.333333-213.333333 213.333333z m0-341.333333c-70.826667 0-128 57.173333-128 128s57.173333 128 128 128 128-57.173333 128-128-57.173333-128-128-128z"
                p-id="1279"
              />
            </svg>
            <slot name="media"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { SizeComposition } from '../composables'
import { computed, reactive, watch, toRef, ref, onMounted } from 'vue';
import { clamp, convertToUnit } from '../helpers'
export default {
  name: 'SpyCard',
  props: {
    leftBoundary: Number,
    rightBoundary: Number,
    contentWidth: Number,
    left: [Number, String],
    top: [Number, String],
    contentTop: [Number, String],
    contentLeft: [Number, String],
    onHover: {
      type: Boolean,
      default: true
    },
    idx: Number,
    currentIdx: Number,
    ...SizeComposition.sizeProps
  },
  inheritAttrs: false,
  setup(props) {
    const state = reactive({
      left: isNaN(props.left) ? 0 : clamp(+props.left, 0, 100),
      top: isNaN(props.top) ? 0 : clamp(+props.top, 0, 100),
      contentTop: 0,
      contentLeft: 0,
      transform: 'translate(-50%, -50%)',
      showContent: false
    })
    const currentLeft = ref(0)
    const leftBoundary = toRef(props, 'leftBoundary');
    const rightBoundary = toRef(props, 'rightBoundary');
    
    const canShow = computed(() => {
      if (props.currentIdx >= 0) {
        return props.idx === props.currentIdx
      }
      return leftBoundary.value < state.left && state.left < rightBoundary.value
    })
    
    function setCurrentLeft(leftBoundary) {
      const windowWidth = window.innerWidth || document.documentElement.offsetWidth
      currentLeft.value = (state.left - leftBoundary) * props.contentWidth / windowWidth
    }
    
    watch([leftBoundary, rightBoundary], ([leftB, rightB]) => {
      if (props.onHover && leftB < state.left && state.left < rightB) {
        setCurrentLeft(leftB)
      }
    })
    const { style: sizeStyle } = SizeComposition.useSize(props) 
    const cardStyle = computed(() => {
      return {
        left: `${currentLeft.value}%`,
        top: `${state.top}%`
      }
    })

    const contentStyle = computed(() => {
      return {
        top: convertToUnit(state.contentTop),
        left: convertToUnit(state.contentLeft),
        transform: state.transform
      }

      // return {
      //   top: convertToUnit(props.contentTop),
      //   left: convertToUnit(props.contentLeft)
      // }
    })
    
    onMounted(() => {
      setCurrentLeft(leftBoundary.value)
    })
   

    

    return {
      sizeStyle,
      cardStyle,
      contentStyle,
      state,
      canShow,
    }
  },
  methods: {
     setCardPosition(e) {
      const x = e.clientX,
       y = e.clientY,
       x0 = window.innerWidth / 2,
       y0 = window.innerHeight / 2;
      let translateX = 10, translateY = 0
      if (x > x0 && y > y0) {
        translateX = -100
        translateY = -100
      } else if (x > x0 && y < y0) {
        translateX = -100
        translateY = -50

      } else if (x < x0 && y > y0) {
        translateX = 10
        translateY = -50

      } 
      this.state.transform = `translate(${translateX}%, ${translateY}%)`
      this.state.contentTop = y
      this.state.contentLeft =x

    },
    showCard(e) {
      this.state.showContent = true
      requestAnimationFrame(() => {
        this.setCardPosition(e)
      })
      this.$emit('hovercard:emits', {
        left: this.state.left, 
        top: this.state.top, 
        width: this.sizeStyle.width, 
        height: this.sizeStyle.height,
        idx: this.idx
      })
    },
    hideCard() {
      this.state.showContent = false
      this.$emit('hovercard:leave', true)

    },
    clickCard() {
      this.state.showContent = !this.state.showContent
    }

  }
}
</script>