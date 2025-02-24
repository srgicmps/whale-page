$(document).ready(function () {
	// genera una clau aleatòria per fer més segura la contrasenya
	function generateSalt() {
		return CryptoJS.lib.WordArray.random(128 / 8).toString();
	}

	// crea l'usuari administrador per defecte si no existeix
	function createDefaultUser() {
		const defaultEmail = "desenvolupador@iesjoanramis.org";
		const salt = generateSalt();

		// encriptam la contrasenya amb la clau secreta
		const defaultPassword = "Ramis.20";
		const saltedPassword = defaultPassword + salt;
		const passwordHash = CryptoJS.SHA256(saltedPassword).toString();

		// cream l'objecte amb les dades de l'admin
		const defaultUser = {
			id: 1,
			name: "admin",
			email: defaultEmail,
			password_hash: passwordHash,
			salt_hash: salt,
			edit_users: true, // pot editar usuaris
			edit_news: true, // pot editar noticies
			edit_bone_files: true, // pot editar arxius
			active: true, // compte actiu
			is_first_login: true, // primer inici de sessió
		};

		// afegim l'admin si no existeix
		const existingUsers = JSON.parse(localStorage.getItem("user")) || [];
		if (!existingUsers.some((user) => user.email === defaultEmail)) {
			existingUsers.push(defaultUser);
		}

		localStorage.setItem("user", JSON.stringify(existingUsers));
	}

	// comprova si l'usuari ha iniciat sessió i mostra/amaga elements
	function checkLoginStatus() {
		const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
		const loginBtn = $("#login-btn");
		const userMenu = $("#user-menu");
		const adminLink = $(".admin-link");

		if (loggedInUser) {
			loginBtn.hide();
			userMenu.show();
			if (loggedInUser.edit_users) {
				adminLink.removeClass("hidden");
			} else {
				adminLink.addClass("hidden");
			}
		} else {
			loginBtn.show();
			userMenu.hide();
			adminLink.addClass("hidden");
		}
	}

	// obtenir tots els usuaris del localStorage
	function getUsers() {
		return JSON.parse(localStorage.getItem("user")) || [];
	}

	// inicialitzam l'aplicació creant l'admin si no existeix
	if (!localStorage.getItem("user") || getUsers().length === 0) {
		createDefaultUser();
	}

	checkLoginStatus();

	// tancam la sessió quan es fa clic al botó
	$("#logout-btn").on("click", function (e) {
		e.preventDefault();
		localStorage.removeItem("loggedInUser");
		window.location.href = "../index.html";
	});
});
