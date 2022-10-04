import "../sass/style.sass";

const menuBtn = document.querySelector(".burger-button-type1");

menuBtn.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("active");
  document.body.classList.toggle("scroll-block");
});