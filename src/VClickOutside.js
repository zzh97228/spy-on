const bind = (e, el, binding) => {
  const value = binding.value;
  const fn = value.fn || (() => {});
  if (!e) return;
  let isActive;
  if (!value.condition) {
    isActive = () => false;
  } else {
    isActive = value.condition;
  }
  const elements = (value.includes || (() => []))();

  elements.push(el);
  if (!elements.some((el) => el && el.contains(e.target))) {
    setTimeout(() => {
      if (isActive(e)) {
        fn && fn(e);
      }
    }, 0);
  }
};
export default {
  mounted: (el, binding) => {
    const clickEvent = (e) => bind(e, el, binding);
    const app = document.querySelector('#app') || document.body;
    app.addEventListener('click', clickEvent, false);
    el._clickOutside = clickEvent;
  },
  beforeUnmount: (el) => {
    if (!el._clickOutside) return;
    const clickEvent = el._clickOutside;
    const app = document.querySelector('#app') || document.body;
    app.removeEventListener('click', clickEvent, false);
    delete el._clickOutside;
  },
};
