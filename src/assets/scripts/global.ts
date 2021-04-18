/* eslint-disable import/no-extraneous-dependencies */

import LazyLoad from 'vanilla-lazyload';

import { openStars, closeStars } from './components/stars';

const lazyLoad = new LazyLoad({
  elements_selector: '.js-lazy',
  use_native: true,
  unobserve_entered: true,
});

const workGreeting = document.querySelector('.js-greeting');
if (workGreeting) {
  const emojis = workGreeting?.getAttribute('data-emojis')?.split('|') || [];

  let index = 0;
  const cycleEmoji = () => {
    index += 1;
    workGreeting.setAttribute('data-current', emojis[index % emojis.length]);
  };

  ['webkitAnimationIteration', 'animationiteration']
    .forEach((event) => workGreeting?.addEventListener(event, cycleEmoji));
}

document.querySelector('.js-menu-open')?.addEventListener('click', (event) => {
  event.preventDefault();

  document.body.classList.add('menu');
  openStars();
});

document.querySelector('.js-menu-close')?.addEventListener('click', (event) => {
  event.preventDefault();

  document.body.classList.remove('menu');
  closeStars();
});

export default lazyLoad;
