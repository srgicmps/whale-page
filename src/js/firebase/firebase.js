// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	setDoc,
	collection,
	updateDoc,
	addDoc,
	deleteDoc,
	serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	updatePassword,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAerRzHvqyWtQtTGcVEmC84_OAytl9qmXU",
	authDomain: "minorcanwhale.firebaseapp.com",
	projectId: "minorcanwhale",
	storageBucket: "minorcanwhale.firebasestorage.app",
	messagingSenderId: "470539123482",
	appId: "1:470539123482:web:ae11dbfffaac3cf41a8aa3",
};
const app = initializeApp(firebaseConfig);

// inicialitzar auth, firesotre i storage
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = async (email, password) => {
	try {
		return await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw error;
	}
};

// login usuaris
export const loginUser = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);

		// comprovar si es el primer inici de sessio llegint de Firestore
		const userDocRef = doc(db, "users", userCredential.user.uid);
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists() && userDoc.data().firstLogin) {
			// redirigir a la pagina de canvi de contrasenya
			window.location.href = "../src/changePassword.html";
		} else {
			// inici de sessio regular
			window.location.href = "../index.html";
		}

		return userCredential;
	} catch (error) {
		throw error;
	}
};

// changepassword fucntion so the user has to change the password on first login
export const changePassword = async (newPassword) => {
	try {
		//aço funciona pq no hi ha cap user autenticat, aunque hi hagi un user default, ningu s'ha autenticat encara
		// const user = auth.currentUser;
		// if (!user) throw new Error("No user logged in");

		// actualitzar contrasenya a Firebase Auth
		await updatePassword(user, newPassword);

		// actualitzar estat de firstLogin a Firestore
		const userDocRef = doc(db, "users", user.uid);
		await updateDoc(userDocRef, {
			firstLogin: false,
		});

		return true;
	} catch (error) {
		console.error("Error canviant la contrasenya:", error);
		throw error;
	}
};

// logout usuaris
export const logoutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		throw error;
	}
};

// Cream s'usuari default
export const createDefaultUser = async () => {
	const defaultEmail = "desenvolupador@iesjoanramis.org";
	const defaultPassword = "PatataBullida123!";

	try {
		// comprovar si l'usuari existeix en autenticacio sense iniciar sessió
		try {
			// Intentar buscar l'usuari per email (mètode indirecte)
			await signInWithEmailAndPassword(auth, defaultEmail, defaultPassword);
			console.log("S'usuari default ja existeix"); // debugging
			await signOut(auth); // Sortir immediatament per no activar la redirección
			return;
		} catch (error) {
			// si l'usuari no existeix, crea'l
			const userCredential = await registerUser(defaultEmail, defaultPassword);
			// crear document d'usuari a firestore with extended permissions
			const userDocRef = doc(db, "users", userCredential.user.uid);
			await setDoc(userDocRef, {
				email: defaultEmail,
				name: "admin",
				role: "admin", // he creat un role aixi es mes "profesinoal"
				edit_users: true, // pot editar usuaris
				edit_news: true, // pot editar noticies
				edit_bone_files: true, // pot editar arxius
				active: true, // compte actiu
				firstLogin: true, // primer inici de sessió
				createdAt: serverTimestamp(),
			});

			console.log("Usuari defautl creat correctament");
			await logoutUser();
		}
	} catch (error) {
		console.error("Error creatnt l'usuari default:", error);
		throw error;
	}
};
