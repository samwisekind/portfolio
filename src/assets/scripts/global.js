/* eslint-disable import/no-extraneous-dependencies */

import LazyLoad from 'vanilla-lazyload';

const lazyLoad = new LazyLoad({ elements_selector: '.js-lazy', use_native: true });

const workGreeting = document.querySelector('.js-greeting');
if (workGreeting) {
  const emojis = workGreeting.getAttribute('data-emojis').split('|');

  let index = 0;
  const cycleEmoji = () => {
    index += 1;
    workGreeting.setAttribute('data-current', emojis[index % emojis.length]);
  };

  ['webkitAnimationIteration', 'animationiteration']
    .forEach((event) => workGreeting.addEventListener(event, cycleEmoji));
}

export default lazyLoad;
