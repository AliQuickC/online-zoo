import "../sass/style.sass";
import pullOutMenu from "./pull-out-menu";
import testimonialsPopup from "./testimonials-popup";
import pets from "./pets";
import donateScale from "./donate-scale";

const isLandingPage = document.body.classList.contains("landing");
const isDonatePage = document.body.classList.contains("donate");

pullOutMenu();

if(isLandingPage) {
	pets();
	testimonialsPopup();
}

if(isDonatePage) {
	donateScale();
}
