import "../sass/style.sass";
import pullOutMenu from "./pull-out-menu";
import pets from "./pets";
import testimonialsPopup from "./testimonials-popup";
import testimonialsSlider from "./testimonials-slider";
import donateScale from "./donate-scale";

const isLandingPage = document.body.classList.contains("landing");
const isDonatePage = document.body.classList.contains("donate");

pullOutMenu();

if(isLandingPage) {
	pets();
	testimonialsPopup();
	testimonialsSlider();
}

if(isDonatePage) {
	donateScale();
}
