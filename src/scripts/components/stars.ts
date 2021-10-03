const canvas = (document.querySelector('.js-stars') as HTMLCanvasElement);
const context = (canvas.getContext('2d') as CanvasRenderingContext2D);

type Star = {
  x: number,
  y: number,
  targetY: number,
  radius: number,
  hue: number,
  sat: number,
};

let stars: Array<Star> = []; // Array for the star objects
const colors = [0, 60, 240]; // Hue range of stars

let start: number | null = null;
let direction: 'open' | 'close';
const duration = 1500; // ms

const easeInOutCubic = (
  t: number,
) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

const getRandomInt = (
  min: number,
  max: number,
) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFloat = (
  min: number,
  max: number,
) => Math.random() * (max - min) + min;

const drawStar = ({
  x,
  y,
  radius,
  hue,
  sat,
}: Star) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 360);
  context.fillStyle = `hsl(${hue}, ${sat}%, 88%)`;
  context.fill();
};

/**
 * Animates stars into or out of the canvas
 * @param {number} timestamp Time to use as elapsed from duration
 */
const animateStars = (
  timestamp: number,
) => {
  if (!start) {
    start = timestamp;
  }

  const elapsed = timestamp - start;

  context.clearRect(0, 0, canvas.width, canvas.height);

  let factor = easeInOutCubic(elapsed / duration);
  if (direction === 'close') {
    factor = -factor + 1;
  }

  if (factor < 0) {
    factor = 0;
  } else if (factor > 1) {
    factor = 1;
  }

  stars.forEach((star) => drawStar({
    ...star,
    y: star.y + ((star.targetY - star.y) * factor),
  }));

  if (elapsed < duration) {
    requestAnimationFrame(animateStars);
  }
};

// Fill the stars array with randomly generated star objects
const openStars = () => {
  stars = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const { width, height } = canvas;

  context.clearRect(0, 0, width, height);

  const density = (width + height) * 0.7;

  for (let i = 0; i <= density; i += 1) {
    const x = getRandomInt(0, width);
    const y = getRandomInt(0, height);

    const radius = getRandomFloat(0.2, 1.5); // Random radius size
    const hue = colors[getRandomInt(0, colors.length - 1)]; // Random hue
    const sat = getRandomInt(50, 100); // Random saturation

    // Draw and save the star
    stars[i] = {
      x,
      y: y - (window.innerHeight * radius),
      targetY: y,
      radius,
      hue,
      sat,
    };

    drawStar(stars[i]);
  }

  requestAnimationFrame((timestamp) => {
    start = null;
    direction = 'open';
    animateStars(timestamp);
  });
};

const closeStars = () => requestAnimationFrame((timestamp) => {
  start = null;
  direction = 'close';
  animateStars(timestamp);
});

export { openStars, closeStars };
