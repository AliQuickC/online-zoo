export default function () {
	const donateScale = document.querySelector(".donate-progress__range");


	donateScale.onclick = (event) => {
		const point = event.target.closest(".donate-progress__point");
		if(point && !event.target.classList.contains("donate-progress__amount")) {
			// console.log("!!!");
		}
	};
};

