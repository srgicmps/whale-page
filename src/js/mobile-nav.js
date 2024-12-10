const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

if (hamburgerBtn && navLinks) {
	hamburgerBtn.addEventListener("click", function () {
		console.log("hola");
		navLinks.classList.toggle("show");
		navLinks.classList.toggle("hidden");
		hamburgerBtn.classList.toggle("active");
	});
}

// function toggleNavig 	ation() {
// 	navLinks.classList.toggle("nav-links-show");
// 	navLinks.classList.toggle("nav-links-hidden");
// }
