import { loginUser } from "./firebase.js";

$(document).ready(function () {
	const loginMessage = $("#login-message");

	function showMessage(message, type) {
		loginMessage.removeClass("hidden error success").addClass(type).text(message).fadeIn();
	}

	async function validateLoginFirebase(email, password) {
		try {
			await loginUser(email, password);
			showMessage("Inici de sessió correcte - Redirigint...", "success");
		} catch (error) {
			let errorMessage = "Error d'inici de sessió";

			switch (error.code) {
				case "auth/user-not-found":
				case "auth/wrong-password":
					errorMessage = "Usuari o contrasenya incorrectes";
					break;
				case "auth/invalid-email":
					errorMessage = "Format d'email invàlid";
					break;
				case "auth/too-many-requests":
					errorMessage = "Massa intents fallits. Prova-ho més tard";
					break;
				default:
					errorMessage = "Error inesperat. Torna-ho a provar";
			}

			showMessage(errorMessage, "error");
		}
	}

	$("#loginForm").submit(function (event) {
		event.preventDefault();
		const email = $("#email").val();
		const password = $("#password").val();
		validateLoginFirebase(email, password);
	});
});
