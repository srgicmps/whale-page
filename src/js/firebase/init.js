import { hasUsers, createDefaultUser } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  hasUsers().then((hasUsers) => {
    if (hasUsers) {
      console.log("Usuarios existentes.");
    } else {
      createDefaultUser();
      console.log("No hi ha usuaris, creant s'usuari per defecte");
    }
  });
  onAuthStateChanged(auth, (user) => {
    const loginBtn = $("#login-btn");
    const logoutBtn = $("#logout-btn");
    const userMenu = $("#user-menu");
    const adminLink = $(".admin-link");

    if (user) {
      // User is logged in
      loginBtn.hide();
      logoutBtn.show();
      userMenu.show();

      // Check if user has permissions
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists() && docSnap.data().edit_users) {
          adminLink.removeClass("hidden");
        } else {
          adminLink.addClass("hidden");
        }
      });
    } else {
      // User is logged out
      loginBtn.show();
      logoutBtn.hide();
      userMenu.hide();
      adminLink.addClass("hidden");
    }
  });

  $("#logout-btn").on("click", function (e) {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  });
});
