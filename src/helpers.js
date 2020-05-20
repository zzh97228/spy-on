import kuishi21 from './assets/kuishi21.png';
import kuishi22 from './assets/kuishi22.png';
import kuishi23 from './assets/kuishi23.png';
import kuishi24 from './assets/kuishi24.png';
import kuishi25 from './assets/kuishi25.png';
import kuishi26 from './assets/kuishi26.png';
import kuishi27 from './assets/kuishi27.png';
import kuishi28 from './assets/kuishi28.png';
import kuishi29 from './assets/kuishi29.png';
import kuishi30 from './assets/kuishi30.png';

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
    width: 48,
    height: 48,
  },
  {
    // 3-2
    left: 18.3,
    top: 53,
    contentTop: 50,
    contentLeft: -256,
    compo: 'Detail32',
    width: 48,
    height: 48,
  },
  {
    // 1
    left: 21,
    top: 53,
    contentTop: -200,
    contentLeft: 100,
    compo: 'Detail1',
    width: 64,
    height: 64,
  },
  {
    // 2
    left: 20.5,
    top: 67,
    contentTop: 40,
    contentLeft: -256,
    compo: 'Detail2',
    width: 128,
    height: 64,
  },
  {
    // 2-2
    left: 25.4,
    top: 39.4,
    contentTop: -200,
    contentLeft: -384,
    // compo: 'Detail22',
    mediaWidth: '15vmax',
    src: kuishi22,
    isImage: true,
    width: 64,
    height: 64,
  },
  {
    // 2-1
    left: 27.5,
    top: 36.6,
    contentTop: -280,
    contentLeft: -350,
    // compo: 'Detail21',
    mediaWidth: '20vmax',
    src: kuishi21,
    isImage: true,
    width: 64,
    height: 64,
  },
  {
    // 2-3
    left: 30,
    top: 50.2,
    contentTop: 0,
    contentLeft: -800,
    mediaWidth: '30vmax',
    src: kuishi23,
    // compo: 'Detail23',
    isImage: true,
    width: 128,
    height: 256,
  },
  {
    // 5
    left: 32.6,
    top: 34.5,
    width: 128,
    height: 128,
  },
  {
    // 8
    left: 33.2,
    top: 53.8,
    width: 64,
    height: 64,
  },
  {
    // 4
    left: 36.3,
    top: 52.0,
    width: 64,
    height: 64,
  },
  {
    // 2-4
    left: 38.9,
    top: 65.7,
    mediaWidth: '30vmax',
    src: kuishi24,
    width: 64,
    height: 64,
    isImage: true,
    contentTop: -200,
    contentLeft: -700,
  },
  {
    // 12
    left: 38.6,
    top: 40.5,
    width: 64,
    height: 64,
  },
  {
    // 11
    left: 41.8,
    top: 25.0,
    width: 128,
    height: 128,
  },
  {
    // 27
    left: 42.9,
    top: 64.0,
    isImage: true,
    mediaWidth: '30vmax',
    src: kuishi27,
    width: 128,
    height: 128,
    contentTop: -150,
    contentLeft: 30,
  },
  {
    // 6
    left: 45.2,
    top: 42.4,
    width: 128,
    height: 128,
  },
  {
    // 17
    left: 49.2,
    top: 26.3,
    width: 64,
    height: 64,
  },
  {
    // 13
    left: 49.2,
    top: 51.8,
    width: 128,
    height: 128,
  },
  {
    // 25
    left: 52.8,
    top: 67.4,
    isImage: true,
    width: 64,
    height: 64,
    mediaWidth: '30vmax',
    src: kuishi25,
    contentTop: -200,
    contentLeft: 30,
  },
  {
    // 26
    left: 53.3,
    top: 48.2,
    isImage: true,
    width: 64,
    height: 64,
    mediaWidth: '40vmax',
    src: kuishi26,
    contentTop: -450,
    contentLeft: -220,
  },
  {
    // 7
    left: 60.8,
    top: 50.0,
    width: 64,
    height: 64,
  },
  {
    // 29
    left: 60.6,
    top: 69.7,
    isImage: true,
    mediaWidth: '40vmax',
    src: kuishi29,
    width: 64,
    height: 64,
    contentTop: -170,
    contentLeft: 30,
  },
  {
    // 9
    left: 63.4,
    top: 49.3,
    width: 128,
    height: 128,
  },
  {
    // 19
    left: 67.0,
    top: 19.1,
    width: 64,
    height: 128,
  },
  {
    // 30
    left: 71.2,
    top: 67.6,
    isImage: true,
    mediaWidth: '40vmax',
    src: kuishi30,
    width: 64,
    height: 64,
    contentTop: -170,
    contentLeft: 30,
  },
  {
    // 10
    left: 72.3,
    top: 51.0,
    width: 128,
    height: 64,
  },
  {
    // 20
    left: 78.4,
    top: 66.5,
    width: 128,
    height: 128,
  },
  {
    // 28
    left: 77.7,
    top: 10.6,
    isImage: true,
    mediaWidth: '30vmax',
    src: kuishi28,
    width: 256,
    height: 256,
    contentTop: -50,
    contentLeft: -700,
  },
  {
    // 14
    left: 81.1,
    top: 13.1,
    width: 64,
    height: 64,
  },
  {
    // 15
    left: 82.1,
    top: 13.9,
    width: 64,
    height: 64,
  },
  {
    // 18
    left: 80.8,
    top: 49.2,
    width: 64,
    height: 64,
  },
  {
    // 16
    left: 85.9,
    top: 9.7,
    width: 128,
    height: 128,
  },
];
