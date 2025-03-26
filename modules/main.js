const toggleMenu = document.querySelector(".toggleMenu");
const menu = document.querySelector(".menu");

toggleMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});
