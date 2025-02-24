$(document).ready(function () {
	const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
	const messageContainer = $("#change-password-message");

	if (!loggedInUser || !loggedInUser.is_first_login) {
		window.location.href = "../index.html";
		return;
	}

	function showMessage(message, type) {
		messageContainer.removeClass("hidden error success").addClass(type).text(message).fadeIn();
	}

	$("#changePasswordForm").submit(function (e) {
		e.preventDefault();

		const newPassword = $("#newPassword").val();
		const confirmPassword = $("#confirmPassword").val();

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

		const users = JSON.parse(localStorage.getItem("user"));
		const userIndex = users.findIndex((u) => u.email === loggedInUser.email);

		if (userIndex !== -1) {
			const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
			const saltedPassword = newPassword + salt;
			const passwordHash = CryptoJS.SHA256(saltedPassword).toString();

			users[userIndex].password_hash = passwordHash;
			users[userIndex].salt_hash = salt;
			users[userIndex].is_first_login = false;

			localStorage.setItem("user", JSON.stringify(users));
			loggedInUser.is_first_login = false;
			localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

			showMessage("Contrasenya canviada correctament! Redirigint...", "success");
			setTimeout(() => {
				window.location.href = "../index.html";
			}, 1500);
		}
	});
});
