import { createDefaultUser } from "./firebase.js";

// executa aixo quan s'aplicacio comença
document.addEventListener("DOMContentLoaded", async () => {
	try {
		await createDefaultUser();
	} catch (error) {
		console.error("Error in initialization:", error);
	}
});
