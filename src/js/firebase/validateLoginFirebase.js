import { loginUser } from "./firebase.js";

$(document).ready(function () {
	const messageContainer = $("#login-message");

	function showMessage(message, type) {
		messageContainer.removeClass("hidden error success").addClass(type).text(message).fadeIn();
	}

	$("#loginForm").submit(async function (e) {
		e.preventDefault();

		const email = $("#email").val().trim();
		const password = $("#password").val();

		// validacio basica del email
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			showMessage("Si us plau, introdueix un email vàlid", "error");
			return;
		}

		// validacio basica de la contrasenya
		if (!password) {
			showMessage("Si us plau, introdueix una contrasenya", "error");
			return;
		}

		try {
			await loginUser(email, password);
			showMessage("Iniciant sessió...", "success");
			// NOTA: no cal redirigir aqui ja que loginuser ho gestiona
		} catch (error) {
			let errorMessage = "Error en iniciar sessió";

			// missatges d'error personalitzats basats en els codis d'error de firebase
			switch (error.code) {
				case "auth/user-not-found":
					errorMessage = "No s'ha trobat cap usuari amb aquest email";
					break;
				case "auth/wrong-password":
					errorMessage = "Contrasenya incorrecta";
					break;
				case "auth/invalid-email":
					errorMessage = "Format d'email invàlid";
					break;
				case "auth/user-disabled":
					errorMessage = "Aquest compte ha estat desactivat";
					break;
			}

			showMessage(errorMessage, "error");
		}
	});
});
