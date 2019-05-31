const captions = Array.from(document.querySelectorAll('.js-caption'));

const bind = (element) => {
  const video = element.querySelector('.js-video');
  const play = element.querySelector('.js-play');

  if (video && play) {
    play.addEventListener('click', (event) => {
      event.preventDefault();

      video.play();
      video.setAttribute('controls', true);
      element.classList.add('playing');
    });
  }
};

captions.forEach(bind);
