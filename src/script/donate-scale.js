export default function () {
	const donateScale = document.querySelector(".donate-progress__range");
	const amountInput = document.querySelector(".pickandfeed-donate__another-amount");
	const markArray = donateScale.querySelectorAll(".donate-progress__mark");
	const amountArray = [5000, 2000, 1000, 500, 250, 100, 50, 25];
	const amountInputMaxLength = +amountInput.dataset.maxlength;
	const initialScaleValue = 100;

	scaleInit();
	setAmount(initialScaleValue);

	function scaleInit() {
		markArray.forEach((elem, i) => {
			elem.dataset.amount = amountArray[i];
		});
	}

	function setAmount(amount) {
		markArray.forEach((elem, i) => {
			if(amountArray[i] === amount) {
				elem.querySelector(".donate-progress__point").classList.add("donate-progress__point_active");
				amountInput.value = amountArray[i];
			} else {
				elem.querySelector(".donate-progress__point").classList.remove("donate-progress__point_active");
			}
		});
	}

	amountInput.addEventListener("input", e => {
		let value = e.target.value;
		value = value.length > amountInputMaxLength ? value.substr(0, amountInputMaxLength) : value;
		// amountArray.some(x => x === amount);
		setAmount(+value);
		e.target.value = value;
	});

	donateScale.onclick = (event) => {
		const point = event.target.closest(".donate-progress__point");
		if(point) {
			setAmount(+point.closest(".donate-progress__mark").dataset.amount);
		}
	};
};

