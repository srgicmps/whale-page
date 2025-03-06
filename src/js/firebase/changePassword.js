import { changePassword } from "./firebase.js";

$(document).ready(function () {
	const messageContainer = $("#change-password-message");

	function showMessage(message, type) {
		messageContainer.removeClass("hidden error success").addClass(type).text(message).fadeIn();
	}

	$("#changePasswordForm").submit(async function (e) {
		e.preventDefault();

		const newPassword = $("#newPassword").val();
		const confirmPassword = $("#confirmPassword").val();

		// Password validation
		if (newPassword.length < 12) {
			showMessage("La contrasenya ha de tenir almenys 12 caràcters", "error");
			return;
		}

		if (!/[A-Z]/.test(newPassword)) {
			showMessage("La contrasenya ha de contenir almenys una lletra majúscula", "error");
			return;
		}

		if (!/[a-z]/.test(newPassword)) {
			showMessage("La contrasenya ha de contenir almenys una lletra minúscula", "error");
			return;
		}

		if (!/[0-9]/.test(newPassword)) {
			showMessage("La contrasenya ha de contenir un o mes números", "error");
			return;
		}

		if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
			showMessage("La contrasenya ha de contenir almenys un caràcters especial", "error");
			return;
		}

		if (newPassword !== confirmPassword) {
			showMessage("Les contrasenyes no coincideixen!!", "error");
			return;
		}

		try {
			await changePassword(newPassword);
			showMessage("Contrasenya canviada correctament - Redirigint...", "success");
			setTimeout(() => {
				window.location.href = "../index.html";
			}, 1500);
		} catch (error) {
			showMessage("Error al canviar la contrasenya", "error");
		}
	});
});
