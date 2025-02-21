function openModal(img) {
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	modal.style.display = "block";
	modalImg.src = img.src;
}

function closeModal() {
	const modal = document.getElementById("imageModal");
	modal.style.display = "none";
}

// Close modal when clicking outside the image
document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("imageModal");
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	// Close modal with ESC key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeModal();
		}
	});
});
