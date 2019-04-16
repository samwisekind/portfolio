const captions = document.querySelector('.js-caption');

const bindBehaviours = (element) => {
  const play = element.querySelector('.js-play');
  const video = element.querySelector('.js-video');

  play.addEventListener('click', (event) => {
    event.preventDefault();
    video.play();
    video.setAttribute('controls', true);
    element.classList.add('playing');
  });
};

for (let i = 0; i < captions.length; i += 1) {
  bindBehaviours(captions[i]);
}
