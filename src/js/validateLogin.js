$(document).ready(function () {
	// agafam loginmessage //he de fer que sigui ONLY JQUERY
	const loginMessage = $("#login-message");

	function showMessage(message, type) {
		loginMessage.removeClass("hidden error success").addClass(type).text(message).fadeIn();
	}

	function validateLogin(email, password) {
		const users = JSON.parse(localStorage.getItem("user")) || [];
		const user = users.find((user) => user.email === email);

		if (user) {
			const saltedPassword = password + user.salt_hash;
			const passwordHash = CryptoJS.SHA256(saltedPassword).toString();

			if (passwordHash === user.password_hash) {
				localStorage.setItem("loggedInUser", JSON.stringify(user));

				// comprovam easy si es la primera vegada que entra a la pagina
				if (user.is_first_login) {
					showMessage("Primer inici de sessió - Redirigint al canvi de contrasenya...", "success");
					setTimeout(() => {
						window.location.href = "../src/changePassword.html";
					}, 1500); // feim redireccio a changePassword amb setTimeout easy si es la primera vegada
				} else {
					showMessage("Inici de sessió correcte - Redirigint...", "success");
					setTimeout(() => {
						window.location.href = "../index.html";
					}, 1500); // si login funciona anam a index
				}
			} else {
				showMessage("Usuari o contrasenya incorrectes", "error");
			}
		} else {
			showMessage("Usuari o contrasenya incorrectes", "error");
		}
	}

	$("#loginForm").submit(function (event) {
		event.preventDefault();
		const email = $("#email").val();
		const password = $("#password").val();
		validateLogin(email, password);
	});
});
