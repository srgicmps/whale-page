$(document).ready(function () {
	function generateSalt() {
		return CryptoJS.lib.WordArray.random(128 / 8).toString();
	}
	function createDefaultUser() {
		// TODO: CRYPTO JS*
		const password = "Ramis.20";
		const salt = generateSalt();
		const saltedPassword = password + salt;
		const passwordHash = CryptoJS.SHA256(saltedPassword).toString();

		const defaultUser = {
			id: 1, // TODO: Fer que s'auto incrementi (a saber com)
			name: "admin",
			email: "desenvolupador@iesjoanramis.org",
			password_hash: passwordHash,
			salt_hash: salt,
			edit_users: true,
			edit_news: true,
			edit_bone_files: true,
			active: true,
			is_first_login: true,
		};

		const keys = {
			hash: passwordHash,
			salt: salt,
		};
		$.ajax({
			url: "../json/keys.json",
			type: "PUT",
			data: JSON.stringify(keys),
			contentType: "application/json",
			success: function () {
				console.log("Keys guardades");
			},
			error: function () {
				console.error("KEYS ERROR");
			},
		});

		localStorage.setItem("user", JSON.stringify(defaultUser));
	}

	// Comprova si s'usuari existeix a localStorage
	if (!localStorage.getItem("user")) {
		createDefaultUser();
	}

	function getUsers() {
		return JSON.parse(localStorage.getItem("user"));
	}

	const users = getUsers();
	console.log(users);
});
