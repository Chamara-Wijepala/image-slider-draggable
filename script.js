const carousel = document.querySelector('.carousel');
const firstImg = carousel.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('i');

let isDragStart = false,
	prevPageX,
	prevScrollLeft;

function showHideIcons() {
	// scrollWidth returns the width of an element including hidden content.
	let maxScrollWidth = carousel.scrollWidth - carousel.clientWidth;

	arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
	arrowIcons[1].style.display =
		carousel.scrollLeft == maxScrollWidth ? 'none' : 'block';
}

function dragStart(e) {
	isDragStart = true;
	// pageX returns the horizontal coordinate (in pixels) where the mouse event
	// fired, relative to the left edge of the entire document.
	// touches returns a list of Touch objects for each touch point on the screen.
	prevPageX = e.pageX || e.touches[0].pageX;
	// scrollLeft gets or sets number of pixels an element's content is scrolled
	// from its left edge.
	prevScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
	// scroll carousel according to mouse pointer
	if (!isDragStart) return;
	e.preventDefault();

	carousel.classList.add('dragging');

	let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;

	carousel.scrollLeft = prevScrollLeft - positionDiff;

	showHideIcons();
}

function dragStop() {
	isDragStart = false;
	carousel.classList.remove('dragging');
}

arrowIcons.forEach((icon) => {
	// clientWidth is the inner width of an element in pixels including padding.
	// add margin between images to first image.
	let firstImgWidth = firstImg.clientWidth + 14;

	// scroll by one image when a scroll button is clicked
	icon.addEventListener('click', () => {
		carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
		setTimeout(() => showHideIcons(), 60);
	});
});

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);
