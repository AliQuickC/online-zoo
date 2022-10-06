(function () {
	const menuBtn = document.querySelector(".burger-button-type1");
	const headerDialog = document.querySelector("#pullout-menu");
	const pullOutMenu = document.querySelector(".pullout-menu__list");

	pullOutMenu.onclick = (event) => {
		const menuItem = event.target.closest(".pullout-menu__item");
		if (menuItem) {
			event.preventDefault();
			const aLink = menuItem.querySelector("a").href;
			document.location.href = aLink;
		}
	}

	menuBtn.addEventListener("click", openDialog);

	headerDialog.onclick = closeDialog;

	function closeDialog(event) {
		const dialogWindow = event.target.closest(".pullout-menu__window");
		const closeButton = event.target.closest(".pullout-menu__close-button")
		if (!dialogWindow || closeButton) {
			if (closeButton && menuBtn.disabled === "disabled") { return; }
			headerDialog.classList.remove("pullout-menu_open");
			menuBtn.classList.remove("active");
			document.body.classList.remove("scroll-block");

			setTimeout(() => {
				headerDialog.close()
				menuBtn.disabled = "";
			}, 900);
		}
	}

	function openDialog() {
		if (menuBtn.disabled === "disabled") { return; }
		menuBtn.classList.add("active");
		document.body.classList.add("scroll-block");

		headerDialog.showModal();
		headerDialog.classList.add("pullout-menu_open");
		menuBtn.disabled === ""
	}
}());
