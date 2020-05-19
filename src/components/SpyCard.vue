<template>
  <teleport to="#app">
    <transition name="fade-opacity">
      <div
        v-show="canShow"
        class="spy-card"
        @mouseenter="() => this.state.showContent = true"
        @mouseleave="() => this.state.showContent = false"
        :style="{...cardStyle}"
      >
        <div class="spy-card-media">
          <div class="spy-card-media__wrapper" :style="sizeStyle">
            <slot name="media"></slot>
          </div>
        </div>

        <transition name="fade-opacity-transform">
          <div v-show="state.showContent" class="spy-card-content">
            <div class="spy-card-content__wrapper" :style="{...contentStyle}">
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
  setup(props) {
    const state = reactive({
      left: isNaN(props.left) ? 0 : clamp(+props.left, 0, 100),
      top: isNaN(props.top) ? 0 : clamp(+props.top, 0, 100),
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
        top: convertToUnit(props.contentTop),
        left: convertToUnit(props.contentLeft)
      }
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
  }
}
</script>