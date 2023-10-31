const carousel = document.querySelector('.carousel');

let isDragStart = false,
	prevPageX,
	prevScrollLeft;

function dragStart(e) {
	isDragStart = true;
	// pageX returns the horizontal coordinate (in pixels) where the mouse event
	// fired, relative to the left edge of the entire document.
	prevPageX = e.pageX;
	// scrollLeft gets or sets number of pixels an element's content is scrolled
	// from its left edge.
	prevScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
	// scroll carousel according to mouse pointer
	if (!isDragStart) return;
	e.preventDefault();

	let positionDiff = e.pageX - prevPageX;

	carousel.scrollLeft = prevScrollLeft - positionDiff;
}

function dragStop() {
	isDragStart = false;
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
