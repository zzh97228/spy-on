<template>
  <teleport to="#app">
    <div class="spy-card" :style="{...cardStyle}">
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
import { PositionComposition, SizeComposition } from '../composables'
import { computed } from 'vue';
export default {
  name: 'SpyCard',
  props: {
    ...PositionComposition.positionProps,
    ...SizeComposition.sizeProps
  },
  setup(props) {
    const { stlye: posStyle } = PositionComposition.usePosition(props);
    const { style: sizeStyle } = SizeComposition.useSize(props) 
    const cardStyle = computed(() => {
      return {
        ...posStyle.value,
        ...sizeStyle.value
      }
    })
    return {
      cardStyle
    }
  }
}
</script>