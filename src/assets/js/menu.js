const { body } = document;
let timeout; // Timeout for menu transition
let menuOpen = false; // Boolean for when the menu is open/closed
let bigBang = false; // Initialisation boolean if the canvas has been populated and rendered
let eventsAdded = false; // Boolean to attach/detach the 'deviceorientation' event listener

const canvas = document.querySelector('.js-stars');
const context = canvas.getContext('2d');

let stars = [];
const offset = 0.2;
const colours = [0, 60, 240];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

const drawStar = ({ x, y, radius, hue, sat }) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 360);
  context.fillStyle = `hsl(${hue}, ${sat}%, 88%)`;
  context.fill();
};

const generateStars = () => {
  stars = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const { width, height } = canvas;

  context.clearRect(0, 0, width, height);

  const overflowX = width * offset;
  const overflowY = height * offset;

  const density = (width + overflowX) + (height + overflowY);

  for (let i = 0; i <= density; i += 1) {
    const x = getRandomInt(-overflowX, width + overflowX);
    const y = getRandomInt(-overflowY, height + overflowY);

    const radius = getRandomFloat(0.2, 1.5);
    const hue = colours[getRandomInt(0, colours.length - 1)];
    const sat = getRandomInt(50, 100);

    stars[i] = { x, y, radius, hue, sat };
    drawStar(stars[i]);
  }
};

const moveStars = ({ beta, gamma }) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const offsetX = (beta * 15) - (canvas.width / 2);
  const offsetY = (gamma * 15) - (canvas.height / 2);

  stars.forEach(star => drawStar({
    ...star,
    x: star.x + (offsetX * 0.25) * (star.radius * 0.5),
    y: star.y + (offsetY * 0.25) * (star.radius * 0.5),
  }));
};

const addEvents = () => {
  if (!eventsAdded) {
    window.addEventListener('deviceorientation', moveStars);
    window.addEventListener('resize', generateStars);
    eventsAdded = true;
  }
};

const removeEvents = () => {
  if (eventsAdded) {
    window.removeEventListener('deviceorientation', moveStars);
    window.removeEventListener('resize', generateStars);
    eventsAdded = false;
  }
};

body.querySelector('.js-menu').addEventListener('click', (event) => {
  event.preventDefault();

  clearTimeout(timeout);

  if (!bigBang) {
    bigBang = true;
    generateStars();
  }

  addEvents();

  body.classList.add('menu', 'position');
  menuOpen = true;
});

body.querySelector('.js-overlay').addEventListener('click', (event) => {
  event.preventDefault();

  // Todo: replace with CSS transition event listener
  timeout = setTimeout(() => {
    menuOpen = false;
    removeEvents();
    body.classList.remove('position');
  }, 200);

  body.classList.remove('menu');
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 800 && menuOpen) {
    generateStars();
    addEvents();
  } else {
    removeEvents();
  }
});
