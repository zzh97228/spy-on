<template>
  <teleport to="#app">
    <div v-show="canShow" class="spy-card" :style="{...cardStyle}">
      <div class="spy-card-media"></div>
      <div class="spy-card-title">
        <slot v-if="$slots.title" name="title"></slot>
        <template v-else>TITLE</template>
      </div>
      <div class="spy-card-content">
        <slot v-if="$slots.default"></slot>
        <div v-else class="spy-row spy-row--align-center">
          <div class="spy-default-avatar"></div>
          <div class="spy-row spy-row--column">
            <div class="spy-default-list-item"></div>
            <div class="spy-default-list-item"></div>
            <div class="spy-default-list-item"></div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { SizeComposition } from '../composables'
import { computed, reactive, watch, toRef, ref, onMounted } from 'vue';
import { clamp } from '../helpers'
export default {
  name: 'SpyCard',
  props: {
    leftBoundary: Number,
    rightBoundary: Number,
    contentWidth: Number,
    left: [Number, String],
    top: [Number, String],
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
    })
    const currentLeft = ref(0)
    const leftBoundary = toRef(props, 'leftBoundary');
    const rightBoundary = toRef(props, 'rightBoundary');
    
    const canShow = computed(() => leftBoundary.value < state.left && state.left < rightBoundary.value)
    
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
        ...sizeStyle.value,
        left: `${currentLeft.value}%`,
        top: `${state.top}%`
      }
    })
    onMounted(() => {
        setCurrentLeft(leftBoundary.value)
    })
    return {
      cardStyle,
      state,
      canShow
    }
  }
}
</script>