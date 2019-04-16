const list = document.querySelector('js-list');
const projects = list.querySelectorAll('js-project');

const groups = {
  left: [],
  right: [],
};

const sizes = {
  spacing: 40, // Spacing between the project elements (40px)
  left: 0, // Total height of the left column
  right: 0, // Total height of the right column
};

const resizeContainer = () => {
  /*
    Resize the container to be equal to the height of the
    tallest column
  */

  if (sizes.left > sizes.right) {
    list.style.height = `${sizes.left}px`;
  } else {
    list.style.height = `${sizes.right}px`;
  }
};

const positionElements = (targetColumn) => {
  let total = 0;
  const targetGroup = groups[targetColumn];

  for (let i = 0; i < targetGroup.length; i += 1) {
    const targetElement = targetGroup[i];

    /*
      Position the current target element according to the accumulated
      column height and spacing total
    */
    targetElement.style.top = `${total}px`;

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
};

const resizeBehaviour = () => {
  /*
    Only call the positioning function if the current viewport width
    is above the single-column layout breakpoint (800px)
  */

  if (window.innerWidth > 800) {
    positionElements('left');
    positionElements('right');
  }
};

const init = () => {
  list.classList.add('columns');

  for (let i = 0; i < projects.length; i += 1) {
    /*
      Loop through the project elements and assign them to either the
      left or right column group based on left-right/odd-even ordering
    */
    if (i % 2 === 0) {
      groups.left.push(projects[i]);
    } else {
      groups.right.push(projects[i]);
    }
  }

  for (let i = 0; i < projects.length; i += 1) {
    /*
      Loop through the project elements again once they've been assigned
      to columns and add event listeners to the image elements as they
      sometimes take time to load (and affect overall column height)
    */

    const image = projects[i].getElementsByClassName('js-image')[0];

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
};

init();
