import { hasUsers, createDefaultUser } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { auth, db } from "./firebase.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
	hasUsers().then((hasUsers) => {
		if (hasUsers) {
			console.log("Usuarios existentes.");
		} else {
			createDefaultUser();
			console.log("No hi ha usuaris, creant s'usuari per defecte");
		}
	});
	// try {
	// 	await createDefaultUser();
	// } catch (error) {
	// 	console.error("Error in initialization:", error);
	// }

	// onAuthStateChanged(auth, (user) => {
	// 	const loginBtn = $("#login-btn");
	// 	const userMenu = $("#user-menu");
	// 	const adminLink = $(".admin-link");

	// 	if (user) {
	// 		// User is logged in
	// 		loginBtn.hide();
	// 		userMenu.show();

	// 		// Check if user has permissions
	// 		const userRef = doc(db, "users", user.uid);
	// 		getDoc(userRef).then((docSnap) => {
	// 			if (docSnap.exists() && docSnap.data().edit_users) {
	// 				adminLink.removeClass("hidden");
	// 			} else {
	// 				adminLink.addClass("hidden");
	// 			}
	// 		});
	// 	} else {
	// 		// User is logged out
	// 		loginBtn.show();
	// 		userMenu.hide();
	// 		adminLink.addClass("hidden");
	// 	}
	// });
});
