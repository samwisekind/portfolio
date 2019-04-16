var $list = document.getElementsByClassName('js-list')[0];
var $projects = $list.getElementsByClassName('js-project');

var groups = {
	left: [],
	right: []
};

var sizes = {
	spacing: 40, // Spacing between the project elements (40px)
	left: 0, // Total height of the left column
	right: 0 // Total height of the right column
};

function init() {

	var i;

	$list.classList.add('columns');

	for (i = 0; i < $projects.length; i++) {

		/*
			Loop through the project elements and assign them to either the
			left or right column group based on left-right/odd-even ordering
		*/

		if (i % 2 === 0) {
			groups.left.push($projects[i]);
		}
		else {
			groups.right.push($projects[i]);
		}

	}

	for (i = 0; i < $projects.length; i++) {

		/*
			Loop through the project elements again once they've been assigned
			to columns and add event listeners to the image elements as they
			sometimes take time to load (and affect overall column height)
		*/

		var image = $projects[i].getElementsByClassName('js-image')[0];

		if (image) {
			image.onload = resizeBehaviour;
		}

	}

	/*
		Bind the resize behaviour to a window resize event, and call the
		function immediately
	*/

	window.addEventListener('resize', resizeBehaviour);

	resizeBehaviour();

}

function resizeBehaviour() {

	/*
		Only call the positioning function if the current viewport width
		is above the single-column layout breakpoint (800px)
	*/

	if (window.innerWidth > 800) {
		positionElements('left');
		positionElements('right');
	}

}

function positionElements(targetColumn) {

	var total = 0;
	var targetGroup = groups[targetColumn];

	for (var i = 0; i < targetGroup.length; i++) {

		var targetElement = targetGroup[i];

		/*
			Position the current target element according to the accumulated
			column height and spacing total
		*/

		targetElement.style.top = total + 'px';

		/*
			Add the current target element's height to the total variable for
			the element directly following it
		*/

		total += targetElement.offsetHeight;

		if (i < targetGroup.length - 1) {

			/*
				If the current target element not the last in the array, then
				add the spacing amount to the current column offset amount
			*/

			total += sizes.spacing;

		}

	}

	sizes[targetColumn] = total;

	resizeContainer();

}

function resizeContainer() {

	/*
		Resize the container to be equal to the height of the
		tallest column
	*/

	if (sizes.left > sizes.right) {
		$list.style.height = sizes.left + 'px';
	}
	else {
		$list.style.height = sizes.right + 'px';
	}

}

(init)();
