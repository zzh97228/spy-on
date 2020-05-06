import { computed } from 'vue';
import { convertToUnit } from '../helpers';

const positionProps = {
  top: [String, Number],
  left: [String, Number],
  right: [String, Number],
  bottom: [String, Number]
}

function usePosition(props) {
  const stlye = computed(() => {
    const obj = {}
    const top = convertToUnit(props.top);
    const left = convertToUnit(props.left);
    const bottom = convertToUnit(props.bottom);
    const right = convertToUnit(props.right);

    if (top) obj.top = top
    if (left) obj.left = left
    if (right) obj.right = right
    if (bottom) obj.bottom = bottom

    return obj
  })
  return {
    stlye
  }
}


export default {
  positionProps,
  usePosition
}