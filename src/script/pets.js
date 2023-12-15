import { randomInteger } from "./utils"

export default function () {
	const petsBase = [
		{ name: "Giant Pandas", native: "Native to Southwest China", food: "animal-card_banan", img: "giant-panda.jpg" },
		{ name: "Eagles", native: "Native to South America", food: "animal-card_meet", img: "eagle.jpg" },
		{ name: "Gorillas", native: "Native to Congo", food: "animal-card_banan", img: "gorillas.jpg" },
		{ name: "Alligators", native: "Native to Southeastern U. S.", food: "animal-card_meet", img: "alligator.jpg" },
		{ name: "Two-toed Sloth", native: "Mesoamerica, South America", food: "animal-card_banan", img: "sloth.jpg" },
		{ name: "cheetahs", native: "Native to Africa", food: "animal-card_meet", img: "cheetahs.jpg" },
		{ name: "Penguins", native: "Native to Antarctica", food: "animal-card_meet", img: "penguins.jpg" },
		{ name: "Quokka", native: "Western Australia", food: "animal-card_banan", img: "quokka.jpg" },
		{ name: "Emperor Tamarin", native: "Amazon jungle", food: "animal-card_banan", img: "emperor-tamarin.jpg" },
		{ name: "Fennec fox", native: "Sahara desert", food: "animal-card_meet", img: "fennec-fox.jpg" },
		{ name: "Alpaca", native: "South America", food: "animal-card_banan", img: "alpaca.jpg" }
	];
	const sliderSwitchTime = 0.9;
	const sliderSwitchTransition = `transform ${sliderSwitchTime}s`;
	let mainCardContainer = document.querySelector(".animals-slider__cards-1");
	let additionalCardContainer = document.querySelector(".animals-slider__cards-2");
	const prevButton = document.querySelector(".animals-slider__prev-button");
	const nextButton = document.querySelector(".animals-slider__next-button");
	let isSwitch = false;
	let cardCount = window.innerWidth < 1000 ? 4 : 6;

	mainCardContainer.style.transition = sliderSwitchTransition;
	generatePetsCard(mainCardContainer, cardCount, petsBase);
	generatePetsCard(additionalCardContainer, cardCount, petsBase);

	window.addEventListener("resize", (event) => {
		const newCardCount = event.target.innerWidth < 1000 ? 4 : 6;
		if(newCardCount !== cardCount) {
			cardCount = newCardCount;
			generatePetsCard(mainCardContainer, cardCount, petsBase);
			generatePetsCard(additionalCardContainer, cardCount, petsBase);
		}
	});

	prevButton.onclick = (event) => {
		if (!isSwitch) {
			isSwitch = true;
			additionalCardContainer.style.transition = "none";
			additionalCardContainer.classList.remove("animals-slider__cards_left-position");
			additionalCardContainer.classList.add("animals-slider__cards_right-position");

			setTimeout(() => {
				additionalCardContainer.style.transition = sliderSwitchTransition;

				mainCardContainer.classList.remove("animals-slider__cards_center-position");
				mainCardContainer.classList.add("animals-slider__cards_left-position");
				additionalCardContainer.classList.remove("animals-slider__cards_right-position");
				additionalCardContainer.classList.add("animals-slider__cards_center-position");

				let replace = mainCardContainer;
				mainCardContainer = additionalCardContainer;
				additionalCardContainer = replace;

				setTimeout(() => {
					generatePetsCard(additionalCardContainer, cardCount, petsBase);
					isSwitch = false; }, sliderSwitchTime*1000);
			}, 0);
		}
	};

	nextButton.onclick = (event) => {
		if (!isSwitch) {
			isSwitch = true;
			additionalCardContainer.style.transition = "none";
			additionalCardContainer.classList.remove("animals-slider__cards_right-position");
			additionalCardContainer.classList.add("animals-slider__cards_left-position");

			setTimeout(() => {
				additionalCardContainer.style.transition = sliderSwitchTransition;

				mainCardContainer.classList.remove("animals-slider__cards_center-position");
				mainCardContainer.classList.add("animals-slider__cards_right-position");
				additionalCardContainer.classList.remove("animals-slider__cards_left-position");
				additionalCardContainer.classList.add("animals-slider__cards_center-position");

				let replace = mainCardContainer;
				mainCardContainer = additionalCardContainer;
				additionalCardContainer = replace;

				setTimeout(() => {
					generatePetsCard(additionalCardContainer, cardCount, petsBase);
					isSwitch = false; }, sliderSwitchTime*1000);
			}, 0);
		}
	};

	function generatePetsCard(cardContainerElement, numberOfCards, fromArray) {
		const petsArray = generateCardNumbers(numberOfCards, fromArray.length - 1);

		cardContainerElement.innerHTML = petsArray.reduce((string, item) =>
			string + `<div class="animals-slider__card animal-card ${petsBase[item].food}">
			<div class="animal-card__image-container">
				<img src="../../assets/images/pets/slider/animals/${petsBase[item].img}" alt="animal image">
				<div class="animal-card__image-popup">
					<h4 class="animal-card__description-title">${petsBase[item].name}</h4>
					<p class="animal-card__description-native">${petsBase[item].native}</p>
				</div>
			</div>
			<div class="animal-card__description">
				<h4 class="animal-card__description-title">${petsBase[item].name}</h4>
				<p class="animal-card__description-native">${petsBase[item].native}</p>
			</div>
		</div>`, "");

		function generateCardNumbers(number, numberAll) {
			if (numberAll > number) {
				const rezultArr = [];
				while (1) {
					let getNumb = randomInteger(0, numberAll);
					if (!rezultArr.includes(getNumb)) {
						rezultArr.push(getNumb);
						if (rezultArr.length === number) return rezultArr;
					}
				}
			} else {
				return [];
			}
		}
	}
};
