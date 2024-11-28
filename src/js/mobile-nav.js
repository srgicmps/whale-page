const expandNavBtn = document.getElementById("expand-nav-btn");
const navLinks = document.getElementById("nav-links");

if (expandNavBtn && navLinks) {
	expandNavBtn.addEventListener("click", function () {
		console.log("hola");
		navLinks.classList.toggle("show");
		navLinks.classList.toggle("hidden");
		expandNavBtn.classList.toggle("active");
	});
}

// function toggleNavig 	ation() {
// 	navLinks.classList.toggle("nav-links-show");
// 	navLinks.classList.toggle("nav-links-hidden");
// }
