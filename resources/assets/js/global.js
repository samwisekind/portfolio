(function(){

	var body = document.body;
	var menu = body.getElementsByClassName('js-menu')[0];
	var overlay = body.getElementsByClassName('js-overlay')[0];
	var timeout; // Timeout for menu transition
	var menuOpen = false; // Boolean for when the menu is open/closed
	var bigBang = false; // Initialisation boolean if the canvas has been populated and rendered
	var listenerAttached = false; // Boolean to attach/detach the 'deviceorientation' event listener
	var starsArray; // Array for the stars
	var canvasSupported = window.HTMLCanvasElement !== undefined; // Check if canvas is supported

	if (canvasSupported === false) {
		body.classList.add('nocanvas');
	}

	menu.addEventListener('click', function(event) {

		event.preventDefault();

		clearTimeout(timeout);

		if (canvasSupported === true) {

			// Generate the stars if they have not been born yet
			if (bigBang === false) {
				bigBang = true;
				generateStars();
			}

			// If the 'deviceorientation' event listener has not been attached yet, attach it
			if (listenerAttached === false) {
				window.addEventListener('deviceorientation', moveStars);
				listenerAttached = true;
			}

		}

		body.classList.add('menu');
		body.classList.add('position');

		menuOpen = true;

	});

	overlay.addEventListener('click', function(event) {

		event.preventDefault();

		timeout = setTimeout(function() {

			menuOpen = false;

			if (canvasSupported === true) {

				// Remove the 'deviceorientation' event listener after the menu transition has finished
				window.removeEventListener('deviceorientation', moveStars);
				listenerAttached = false;
			}

			body.classList.remove('position');

		}, 200);

		body.classList.remove('menu');

	});

	window.addEventListener('resize', function(event) {

		if (canvasSupported === true) {

			if (window.innerWidth <= 800 && menuOpen === true) {

				generateStars();

				if (listenerAttached === false) {
					window.addEventListener('deviceorientation', motionHandler);
					listenerAttached = true;
				}

			}
			else if (window.innerWidth > 800 && listenerAttached === true) {

				window.removeEventListener('deviceorientation', motionHandler);
				listenerAttached = false;

			}

		}

	});

	function generateStars() {

		// Wrapper for min/max random
		function getRandom(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		// Get the canvas, resize it to the window width and height, and get and 2D context for drawing
		window.canvas = document.getElementsByClassName('js-stars')[0];
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		window.canvasContext = canvas.getContext('2d');

		var stars = Math.floor((window.innerWidth + window.innerHeight) / 1.8); // Number of stars to generate in proportion to the window size
		var colours = [0, 60, 240]; // Colour range of stars

		// Empty the array
		starsArray = [];

		// Generate an array of star objects
		for (var i = stars; i--;) {

			var x = Math.random() * window.innerWidth; // x-coordinates within the canvas size
			var y = Math.random() * window.innerHeight; // y-coordinates within the canvas size
			var radius = Math.random() * 1.2; // Random radius size
			var hue = colours[getRandom(0, colours.length - 1)]; // Random hue
			var sat = getRandom(50, 100); // Random saturation

			starsArray[i] = {
				x: x,
				y: y,
				radius: radius,
				hue: hue,
				sat: sat
			};

		}

		// Loop through the star array and draw them as arcs on the canvas
		for (i = 0; i < starsArray.length; i++) {

			var target = starsArray[i];

			canvasContext.beginPath();
			canvasContext.arc(target.x, target.y, target.radius, 0, 360);
			canvasContext.fillStyle = 'hsl(' + target.hue + ', ' + target.sat + '%, 88%)';
			canvasContext.fill();

		}

	}

	function motionHandler(event) {

		if (window.requestAnimationFrame !== undefined) {

			window.requestAnimationFrame(function() {
				moveStars(event);
			});

		}
		else {

			moveStars(event);

		}

	}

	function moveStars(event) {

		// Get the beta and gamma values and reduce them slightly
		var beta = event.beta * 0.75;
		var gamma = event.gamma * 0.75;

		// Clear the canvas
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);

		// Loop through the stars array to move them slightly and re-draw them on the canvas
		for (var i = starsArray.length; i--;) {

			var target = starsArray[i];

			var newX = target.x + (gamma * target.radius);
			var newY = target.y + (beta * target.radius) - (90 / 3); // Minus one-third of a degree assuming the natural viewing position

			canvasContext.beginPath();
			canvasContext.arc(newX, newY, target.radius, 0, 360);
			canvasContext.fillStyle = 'hsl(' + target.hue + ', ' + target.sat + '%, 88%)';
			canvasContext.fill();

		}

	}

})();
