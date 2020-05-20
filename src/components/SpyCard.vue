<template>
  <teleport to="#app">
    <transition name="fade-opacity">
      <div v-show="canShow" class="spy-card" :style="{...cardStyle}">
        <div
          class="spy-card-media"
          @mouseenter="showCard"
          @mouseleave="hideCard"
          @click="clickCard"
        >
          <div class="spy-card-media__wrapper" :style="sizeStyle">
            <slot name="media"></slot>
          </div>
        </div>

        <transition name="fade-opacity-transform">
          <div v-show="state.showContent" class="spy-card-content">
            <div class="spy-card-content__wrapper" ref="content" :style="contentStyle">
              <slot></slot>
            </div>
          </div>
        </transition>
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
      let translateX = 0, translateY = 0
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
      this.$emit('hovercard:emits', {left: this.state.left, top: this.state.top, width: this.sizeStyle.width, height: this.sizeStyle.height})
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