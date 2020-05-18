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

export const pos = [
  {
    // 3-1
    left: 18.3,
    top: 38.5,
    contentTop: 0,
    contentLeft: -256,
    compo: 'Detail31',
  },
  {
    // 3-2
    left: 18.3,
    top: 53,
    contentTop: 20,
    contentLeft: -256,
    compo: 'Detail32',
  },
  {
    // 1
    left: 21,
    top: 53,
  },
  {
    // 2
    left: 21,
    top: 67,
    contentTop: 30,
    contentLeft: -256,
    compo: 'Detail2',
  },
  {
    // 2-2
    left: 25.35,
    top: 39,
  },
  {
    // 2-1
    left: 27.5,
    top: 36.6,
  },
  {
    // 2-3
    left: 30.4,
    top: 71.1,
  },
  {
    // 5
    left: 33.0,
    top: 39.8,
  },
  {
    // 8
    left: 33.4,
    top: 58.8,
  },
  {
    // 4
    left: 36.5,
    top: 54.3,
  },
  {
    // 2-4
    left: 38.2,
    top: 77.2,
  },
  {
    // 12
    left: 39.2,
    top: 44.0,
  },
  {
    // 11
    left: 42.6,
    top: 29.0,
  },
  {
    // 27
    left: 42.9,
    top: 67.3,
  },
  {
    // 6
    left: 45.8,
    top: 44.4,
  },
  {
    // 17
    left: 49.4,
    top: 29.0,
  },
  {
    // 13
    left: 49.4,
    top: 54.5,
  },
  {
    // 25
    left: 51.5,
    top: 86.0,
  },
  {
    // 26
    left: 53.6,
    top: 50.3,
  },
  {
    // 7
    left: 61.0,
    top: 52.3,
  },
  {
    // 29
    left: 61.1,
    top: 72.4,
  },
  {
    // 9
    left: 63.9,
    top: 53.0,
  },
  {
    // 19
    left: 67.3,
    top: 24.4,
  },
  {
    // 30
    left: 71.5,
    top: 69.6,
  },
  {
    // 10
    left: 72.7,
    top: 56.7,
  },
  {
    // 20
    left: 79.4,
    top: 69.5,
  },
  {
    // 28
    left: 78.2,
    top: 20,
  },
  {
    // 14
    left: 81.4,
    top: 15.9,
  },
  {
    // 15
    left: 82.4,
    top: 15.9,
  },
  {
    // 18
    left: 81.0,
    top: 52.1,
  },
  {
    // 16
    left: 85.9,
    top: 9.5,
  },
];
