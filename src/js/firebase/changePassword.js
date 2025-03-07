import { changePassword } from "./firebase.js";

$(document).ready(function () {
	$("#changePasswordForm").on("submit", async function (e) {
		e.preventDefault();

		const newPassword = $("#newPassword").val();
		const confirmPassword = $("#confirmPassword").val();

		if (newPassword !== confirmPassword) {
			alert("Les contrasenyes no coincideixen");
			return;
		}

		try {
			await changePassword(newPassword);
			alert("Contrasenya actualitzada correctament");
			$("#changePasswordForm")[0].reset();
			window.location.href = "../index.html";
		} catch (error) {
			alert("Error actualitzant la contrasenya: " + error.message);
		}
	});
});
