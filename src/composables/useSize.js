import { computed } from 'vue';
import { convertToUnit } from '../helpers'
const sizeProps = {
  height: [String, Number],
  width: [String, Number],
  minHeight: [String, Number],
  minWidth: [String, Number],
  maxWidth: [String, Number],
  maxHeight: [String, Number],
}
function useSize(props) {
  const style = computed(() => {
    const styles = {};
    const height = convertToUnit(props.height);
    const width = convertToUnit(props.width);
    const minHeight = convertToUnit(props.minHeight);
    const minWidth = convertToUnit(props.minWidth);
    const maxHeight = convertToUnit(props.maxHeight);
    const maxWidth = convertToUnit(props.maxWidth);
    if (height) styles.height = height;
    if (width) styles.width = width;
    if (minHeight) styles.minHeight = minHeight;
    if (minWidth) styles.minWidth = minWidth;
    if (maxHeight) styles.maxHeight = maxHeight;
    if (maxWidth) styles.maxWidth = maxWidth;
    return styles;
  });

  return {
    style,
  };
}

export default {
  useSize,
  sizeProps
}