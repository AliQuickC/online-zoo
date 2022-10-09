export default function () {
	const range = document.querySelector(".testimonials-slider__progress");
	const testimonialsSlider = document.querySelector(".testimonials-slider");
	let intervalCount = window.innerWidth < 1261 ? 8 : 7;
	range.max = intervalCount;
	testimonialsSlider.style.setProperty('--slider-position', range.value);

	range.addEventListener("input", event => {
		testimonialsSlider.style.setProperty('--slider-position', event.target.value);
	});

	window.addEventListener("resize", (event) => {
		const newIntervalCount = event.target.innerWidth < 1261 ? 8 : 7;
		if(newIntervalCount !== intervalCount) {
			intervalCount = newIntervalCount;
			range.max = intervalCount;
		}
	});
};