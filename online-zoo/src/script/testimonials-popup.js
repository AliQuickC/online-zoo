(function () {
	const poupupDialog = document.querySelector("#testimonials-popup");
	const slides = document.querySelector(".testimonials-slider__slides");

	poupupDialog.onclick = closeDialog;

	function closeDialog(event) {
		const dialogWindow = event.target.closest(".testimonials-popup__window");
		const closeButton = event.target.closest(".testimonials-popup__close-button")
		if (!dialogWindow || closeButton) {
			poupupDialog.classList.remove("testimonials-popup_open");
			document.body.classList.remove("scroll-block");

			setTimeout(() => {poupupDialog.close();}, 900);
		}
	}

	slides.onclick = (event) => {
		const card = event.target.closest(".testimonials-slider-card")
		if(card) {
			const dialogWindow = poupupDialog.querySelector(".testimonials-popup__window");
			dialogWindow.removeChild(dialogWindow.querySelector(".testimonials-popup-card"));

			const cardClone = card.cloneNode(true);
			cardClone.className = "testimonials-card testimonials-popup-card testimonials-popup__card";
			dialogWindow.prepend(cardClone);

			openDialog();
		}
	};

	function openDialog() {
		poupupDialog.showModal();
		poupupDialog.classList.add("testimonials-popup_open");
		document.body.classList.add("scroll-block");
	}
}());
