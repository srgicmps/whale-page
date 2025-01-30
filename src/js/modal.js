document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("modal");
	const modalTitle = document.getElementById("modal-title");
	const modalInfo = document.getElementById("modal-info");
	const modalImage = document.getElementById("modal-image");
	const closeModal = document.querySelector(".close-btn");

	function showModal(part, info, image, title) {
		modalTitle.innerText = title;
		modalInfo.innerText = info;
		modalImage.src = image;
		modal.style.display = "block";
	}

	function hideModal() {
		modal.style.display = "none";
	}

	document.querySelectorAll(".whale-part, .clickable-area").forEach((element) => {
		element.addEventListener("click", function () {
			const part = this.getAttribute("data-part");
			const info = this.getAttribute("data-info");
			const image = this.getAttribute("data-image");
			const title = this.querySelector("h2") ? this.querySelector("h2").innerText : part.replace("-", " ");

			showModal(part, info, image, title);
		});
	});

	closeModal.addEventListener("click", hideModal);

	window.addEventListener("click", function (event) {
		if (event.target == modal) {
			hideModal();
		}
	});

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
});
