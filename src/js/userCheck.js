$(document).ready(function () {
	function generateSalt() {
		return CryptoJS.lib.WordArray.random(128 / 8).toString();
	}

	function createDefaultUser() {
		const defaultEmail = "desenvolupador@iesjoanramis.org";
		const salt = generateSalt();

		const defaultPassword = "Ramis.20";
		const saltedPassword = defaultPassword + salt;
		const passwordHash = CryptoJS.SHA256(saltedPassword).toString();

		const defaultUser = {
			id: 1,
			name: "admin",
			email: defaultEmail,
			password_hash: passwordHash,
			salt_hash: salt,
			edit_users: true,
			edit_news: true,
			edit_bone_files: true,
			active: true,
			is_first_login: true,
		};

		const existingUsers = JSON.parse(localStorage.getItem("user")) || [];
		if (!existingUsers.some((user) => user.email === defaultEmail)) {
			existingUsers.push(defaultUser);
		}

		localStorage.setItem("user", JSON.stringify(existingUsers));
	}

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

	function protectAdminUser() {
		const users = JSON.parse(localStorage.getItem("user")) || [];
		const adminEmail = "desenvolupador@iesjoanramis.org";

		const adminUser = users.find((user) => user.email === adminEmail);
		if (!adminUser) {
			createDefaultUser();
		} else {
			adminUser.active = true;
			localStorage.setItem("user", JSON.stringify(users));
		}
	}

	function getUsers() {
		return JSON.parse(localStorage.getItem("user")) || [];
	}

	if (!localStorage.getItem("user") || getUsers().length === 0) {
		createDefaultUser();
	}

	protectAdminUser();
	checkLoginStatus();

	$("#logout-btn").on("click", function (e) {
		e.preventDefault();
		localStorage.removeItem("loggedInUser");
		window.location.href = "../index.html";
	});

	if (window.location.hostname === "localhost") {
		console.log("Current users:", getUsers());
	}
});
