export function convertToUnit(str, unit = 'px') {
  if (str == null || str == '') return null;
  else if (isNaN(+str)) return String(str);
  else return '' + Number(str) + unit;
}

export function on(el, eventName, callback = () => {}, options = false) {
  el.addEventListener(eventName, callback, options);
}

export function off(el, eventName, callback = () => {}, options = false) {
  el.removeEventListener(eventName, callback, options);
}

export function clamp(num, min, max) {
  return Math.max(Math.min(num, max), min);
}
