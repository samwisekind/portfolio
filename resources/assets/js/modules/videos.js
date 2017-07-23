var captions = document.getElementsByClassName('js-caption');

var bindBehaviours = function(element) {

	var play = element.getElementsByClassName('js-play')[0];
	var video = element.getElementsByClassName('js-video')[0];

	play.addEventListener('click', function(event) {
		event.preventDefault();
		video.play();
		element.classList.add('playing');
	});

};

for (var i = 0; i < captions.length; i++) {
	bindBehaviours(captions[i]);
}
