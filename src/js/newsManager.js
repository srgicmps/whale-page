// TODO: NEW PROVISIONAL JA QUE ME FALTA FER ES DRAGGABLE I DROPPABLE DE LES NOTICIES (me falta fer firebase (facil) )

// clau per guardar les noticies al localstorage
const STORAGE_KEY = "whaleNews";

// comprova si l'usuari pot editar noticies
function canEditNews() {
	const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
	return loggedInUser && loggedInUser.edit_news === true;
}

// crea l'element html de la noticia
function createNewsElement(item) {
	// const per comprovar si pot editar(segurament ho puc fer mes facilment)
	const canEdit = canEditNews();
	if (!canEdit && item.status === 0) return "";

	// cream l'article principal amb les seves classes
	const $article = $("<article>")
		.addClass("relative bg-white p-6 mb-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300")
		.attr("data-id", item.id);

	// si pot editar, afegim el boto de moure (pijada no funciona)
	// if (canEdit) {
	// 	$("<div>")
	// 		.addClass("cursor-move text-gray-400 text-2xl absolute top-4 right-4 drag-handle")
	// 		.text("⋮")
	// 		.appendTo($article);
	// }

	// cream la capcalera amb el titol
	const $header = $("<div>").addClass("mb-6").appendTo($article);

	$("<h2>")
		.addClass(
			`text-2xl font-bold mb-3 p-2 rounded transition-colors news-title ${
				canEdit ? "hover:bg-gray-50 editable" : ""
			}`
		)
		.text(item.title)
		.appendTo($header);

	// afegim la info de la noticia (autor, dates, etc)
	const $meta = $("<div>").addClass("flex flex-wrap items-center gap-3 text-sm text-gray-600").appendTo($header);

	$("<span>")
		.html(`By <span class="${canEdit ? "hover:bg-gray-50 p-1 rounded author editable" : ""}">${item.author}</span>`)
		.appendTo($meta);
	$("<span>").text("•").appendTo($meta);
	$("<span>")
		.text(`Created: ${new Date(item.createdDate).toLocaleDateString()}`)
		.appendTo($meta);
	$("<span>").text("•").appendTo($meta);
	$("<span>")
		.text(`Modified: ${new Date(item.modifiedDate).toLocaleDateString()}`)
		.appendTo($meta);

	// si pot editar, mostram l'estat (published/draft)
	if (canEdit) {
		$("<span>").text("•").appendTo($meta);
		$("<span>")
			.addClass(
				`px-3 py-1 rounded-full ${
					item.status === 1 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
				}`
			)
			.text(item.status === 1 ? "Publicat" : "Esborrany")
			.appendTo($meta);
	}

	// contingut de la noticia
	$("<div>")
		.addClass(
			`news-content ${canEdit ? "editable" : ""} min-h-[100px] p-4 mb-6 border border-gray-200 rounded-lg ${
				canEdit ? "hover:bg-gray-50" : ""
			} transition-colors`
		)
		.text(item.content)
		.appendTo($article);

	// buttons de la noticia
	if (canEdit) {
		const $buttons = $("<div>").addClass("flex gap-3").appendTo($article);

		$("<button>")
			.addClass("save-draft-btn px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors")
			.text("Guardar Esborrany")
			.appendTo($buttons);

		$("<button>")
			.addClass("publish-btn px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors")
			.text("Publicar")
			.appendTo($buttons);

		$("<button>")
			.addClass("delete-btn px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors")
			.text("Esborrar")
			.appendTo($buttons);
	}

	return $article;
}

// inicialitza el localStorage si no existeix
function initializeStorage() {
	if (!localStorage.getItem(STORAGE_KEY)) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
	}
}

// agafa les noticies del localStorage
function getNews() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

// guarda les noticies al localStorage
function saveToStorage(news) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(news));
}

// crea una nova noticia
function createNewArticle() {
	if (!canEditNews()) return;

	const id = Date.now();
	// objecte amb les dades de la noticia nova
	const newsItem = {
		id: id,
		title: "Nou Article",
		author: "Nom de l'Auotr",
		createdDate: new Date().toISOString(),
		modifiedDate: new Date().toISOString(),
		content: "Comença a escriure aquí",
		status: 0,
	};

	const news = getNews();
	news.push(newsItem);
	saveToStorage(news);
	renderNews();
}

// guarda els canvis d'una noticia
function saveNews(id, status) {
	if (!canEditNews()) return;

	const news = getNews();
	const index = news.findIndex((item) => item.id === id);

	if (index !== -1) {
		const article = $(`article[data-id="${id}"]`);
		// actualitza les dades de la noticia
		news[index] = {
			...news[index],
			title: article.find(".news-title").text(),
			author: article.find(".author").text(),
			content: article.find(".news-content").text(),
			modifiedDate: new Date().toISOString(),
			status: status,
		};

		saveToStorage(news);
		renderNews();
	}
}

// per borrar la noticia easy
function deleteNews(id) {
	if (!canEditNews()) return;

	if (confirm("Segur vols eliminar l'article?")) {
		const news = getNews().filter((item) => item.id !== id);
		saveToStorage(news);
		renderNews();
	}
}

// mostra totes les noticies
function renderNews() {
	const news = getNews();
	const container = $(".news-container");
	container.empty();

	news.forEach((item) => {
		container.append(createNewsElement(item));
	});
}

$(document).ready(function () {
	initializeStorage();

	// amaga el boto d'afegir si no te permisos
	const canEdit = canEditNews();
	$("#add-news-btn").toggle(canEdit);

	//eVents de tots el butons
	$("#add-news-btn").on("click", createNewArticle);

	$(document).on("click", ".save-draft-btn", function (e) {
		const articleId = $(this).closest("article").data("id");
		saveNews(articleId, 0);
	});

	$(document).on("click", ".publish-btn", function (e) {
		const articleId = $(this).closest("article").data("id");
		saveNews(articleId, 1);
	});

	$(document).on("click", ".delete-btn", function (e) {
		const articleId = $(this).closest("article").data("id");
		deleteNews(articleId);
	});

	// Doble click que n'Irene demanava
	$(document).on("dblclick", ".editable", function () {
		if (canEditNews()) {
			$(this).attr("contenteditable", "true").focus();
		}
	});

	// pijadas
	$(document).on("blur", ".editable", function () {
		if (canEditNews()) {
			$(this).removeAttr("contenteditable");
		}
	});

	// renderitzam les news facil
	renderNews();
});
