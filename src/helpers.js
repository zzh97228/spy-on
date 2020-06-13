// import kuishi21 from './assets/kuishi21.png';
// import kuishi22 from './assets/kuishi22.png';
// import kuishi23 from './assets/kuishi23.png';
// import kuishi24 from './assets/kuishi24.png';
// import kuishi25 from './assets/kuishi25.png';
// import kuishi26 from './assets/kuishi26.png';
// import kuishi27 from './assets/kuishi27.png';
// import kuishi28 from './assets/kuishi28.png';
// import kuishi29 from './assets/kuishi29.png';
// import kuishi30 from './assets/kuishi30.png';
import { defineComponent, h } from 'vue';
const kuishi21 = 'https://cdn.lagabu.com/factory/kuishi21.png';
const kuishi22 = 'https://cdn.lagabu.com/factory/kuishi22.png';
const kuishi23 = 'https://cdn.lagabu.com/factory/kuishi23.png';
const kuishi24 = 'https://cdn.lagabu.com/factory/kuishi24.png';
const kuishi25 = 'https://cdn.lagabu.com/factory/kuishi25.png';
const kuishi26 = 'https://cdn.lagabu.com/factory/kuishi26.png';
const kuishi27 = 'https://cdn.lagabu.com/factory/kuishi27.png';
const kuishi28 = 'https://cdn.lagabu.com/factory/kuishi28.png';
const kuishi29 = 'https://cdn.lagabu.com/factory/kuishi29.png';
const kuishi30 = 'https://cdn.lagabu.com/factory/kuishi30.png';

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

export function createSimpleDetailComponents(name = '', title = '', text = []) {
  return defineComponent({
    name: name || 'SimpleDetail',
    render() {
      const textArray = text.map((t, index) => {
        return h('li', { key: index }, [
          h('span', { class: 'spy-text' }, t.split('——')[0] + '——'),
          h('span', { class: 'spy-title' }, t.split('——')[1]),
        ]);
      });

      const titleDiv = () =>
        h(
          'div',
          {
            class: 'spy-title--red',
            style: {
              'padding-left': '24px',
            },
          },
          title || ''
        );
      const ol = () => h('ol', textArray);
      return h(
        'div',
        {
          class: 'spy-row spy-image',
        },
        [titleDiv(), ol()]
      );
    },
  });
}

export const pos = [
  {
    // 3-1
    left: 18.6,
    top: 40.7,
    contentTop: 0,
    contentLeft: -256,
    compo: 'Detail31',
    width: '10vh',
    height: '10vh',
  },
  {
    // 3-2
    left: 18.5,
    top: 54.6,
    contentTop: 50,
    contentLeft: -256,
    compo: 'Detail32',
    width: '10vh',
    height: '10vh',
  },
  {
    // 1
    left: 21.4,
    top: 55.8,
    contentTop: -200,
    contentLeft: 100,
    compo: 'Detail1',
    width: '20vh',
    height: '20vh',
  },
  {
    // 2
    left: 21.2,
    top: 74.7,
    contentTop: 40,
    contentLeft: -256,
    compo: 'Detail2',
    width: '20vh',
    height: '20vh',
  },
  {
    // 2-2
    left: 25.7,
    top: 41.7,
    contentTop: -200,
    contentLeft: -384,
    // compo: 'Detail22',
    mediaWidth: '15vmax',
    src: kuishi22,
    isImage: true,
    width: '20vh',
    height: '20vh',
  },
  {
    // 2-1
    left: 27.8,
    top: 36.4,
    contentTop: -280,
    contentLeft: -350,
    // compo: 'Detail21',
    mediaWidth: '20vmax',
    src: kuishi21,
    isImage: true,
    width: '20vh',
    height: '20vh',
  },
  {
    // 2-3
    left: 30.5,
    top: 52.6,
    contentTop: 0,
    contentLeft: -800,
    mediaWidth: '30vmax',
    src: kuishi23,
    // compo: 'Detail23',
    isImage: true,
    width: '30vh',
    height: '40vh',
  },
  {
    // 5
    left: 33.1,
    top: 39.2,
    width: '20vh',
    height: '20vh',
    compo: 'Detail5',
  },
  {
    // 8
    left: 33.5,
    top: 57.7,
    width: '15vh',
    height: '15vh',
    compo: 'Detail8',
  },
  {
    // 4
    left: 36.5,
    top: 54.2,
    width: '20vh',
    height: '25vh',
    compo: 'Detail4',
  },
  {
    // 2-4
    left: 39.2,
    top: 67.4,
    mediaWidth: '30vmax',
    src: kuishi24,
    width: '15vh',
    height: '15vh',
    isImage: true,
    contentTop: -200,
    contentLeft: -700,
  },
  {
    // 12
    left: 39.2,
    top: 43.8,
    width: '35vh',
    height: '35vh',
    compo: 'Detail12',
  },
  {
    // 11
    left: 42.3,
    top: 30,
    width: '20vh',
    height: '20vh',
    compo: 'Detail11',
  },
  {
    // 27
    left: 42.9,
    top: 67.4,
    isImage: true,
    mediaWidth: '30vmax',
    src: kuishi27,
    width: '25vh',
    height: '20vh',
    contentTop: -150,
    contentLeft: 30,
  },
  {
    // 6
    left: 45.9,
    top: 47.5,
    width: '25vh',
    height: '25vh',
    compo: 'Detail6',
  },
  {
    // 17
    left: 49.5,
    top: 29.3,
    width: '15vh',
    height: '15vh',
    compo: 'Detail17',
  },
  {
    // 13
    left: 49.7,
    top: 56.7,
    width: '20vh',
    height: '20vh',
    compo: 'Detail13',
  },
  {
    // 25
    left: 53.4,
    top: 84.1,
    isImage: true,
    width: '35vh',
    height: '20vh',
    mediaWidth: '30vmax',
    src: kuishi25,
    contentTop: -200,
    contentLeft: 30,
  },
  {
    // 26
    left: 53.6,
    top: 47.0,
    isImage: true,
    width: '20vh',
    height: '30vh',
    mediaWidth: '30vmax',
    src: kuishi26,
    contentTop: -450,
    contentLeft: -220,
  },
  {
    // 7
    left: 61.1,
    top: 53.1,
    width: '20vh',
    height: '20vh',
    compo: 'Detail7',
  },
  {
    // 29
    left: 60.7,
    top: 68.3,
    isImage: true,
    mediaWidth: '30vmax',
    src: kuishi29,
    width: '35vh',
    height: '20vh',
    contentTop: -170,
    contentLeft: 30,
  },
  {
    // 9
    left: 63.9,
    top: 52.4,
    width: '25vh',
    height: '30vh',
    compo: 'Detail9',
  },
  {
    // 19
    left: 67.5,
    top: 22.1,
    width: '20vh',
    height: '30vh',
    compo: 'Detail19',
  },
  {
    // 30
    left: 71.7,
    top: 68.1,
    isImage: true,
    mediaWidth: '30vmax',
    src: kuishi30,
    width: '35vh',
    height: '20vh',
    contentTop: -170,
    contentLeft: 30,
  },
  {
    // 10
    left: 72.4,
    top: 48.4,
    width: '35vh',
    height: '20vh',
    compo: 'Detail10',
  },
  {
    // 20
    left: 78.4,
    top: 66.5,
    width: '25vh',
    height: '25vh',
    compo: 'Detail20',
  },
  {
    // 28
    left: 79.0,
    top: 21.3,
    isImage: true,
    mediaWidth: '30vmax',
    src: kuishi28,
    width: '25vh',
    height: '35vh',
    contentTop: -50,
    contentLeft: -700,
  },
  {
    // 14
    left: 81.1,
    top: 15.8,
    width: '10vh',
    height: '10vh',
    compo: 'Detail14',
  },
  // {
  //   // 15
  //   left: 82.1,
  //   top: 15.8,
  //   width: '10vh',
  //   height: '10vh',
  //   compo: 'Detail14',
  // },
  {
    // 18
    left: 81.8,
    top: 52.2,
    width: '35vh',
    height: '25vh',
    compo: 'Detail18',
  },
  {
    // 16
    left: 86.2,
    top: 14.1,
    width: '20vh',
    height: '20vh',
    compo: 'Detail16',
  },
];
