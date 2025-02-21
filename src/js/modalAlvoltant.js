document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("infoModal");
	const modalTitle = document.getElementById("modalTitle");
	const modalImage = document.getElementById("modalImage");
	const modalText = document.getElementById("modalText");
	const closeBtn = document.querySelector(".close");

	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", () => {
			modalTitle.textContent = card.querySelector("h2").textContent;
			modalImage.src = card.querySelector("img").src;
			modalText.textContent = card.dataset.info;
			modal.style.display = "block";
			document.body.style.overflow = "hidden";
		});
	});

	closeBtn.addEventListener("click", () => {
		modal.style.display = "none";
		document.body.style.overflow = "auto";
	});

	window.addEventListener("click", (event) => {
		if (event.target === modal) {
			modal.style.display = "none";
			document.body.style.overflow = "auto";
		}
	});
});
