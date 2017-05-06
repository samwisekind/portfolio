(function(){

	var body = document.body;
	var menu = document.getElementsByClassName('js-menu')[0];
	var overlay = document.getElementsByClassName('js-overlay')[0];
	var timeout;

	menu.addEventListener('click', function(event) {

		event.preventDefault();
		clearTimeout(timeout);
		body.classList.add('menu');

	});

	overlay.addEventListener('click', function(event) {

		event.preventDefault();
		body.classList.remove('menu');

	});

})();
