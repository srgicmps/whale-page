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

	// si pot editar, mostram l'estat (publicat/esborrany)
	if (canEdit) {
		const $controls = $("<div>").addClass("mb-4 flex gap-2").appendTo($article);

		$("<button>")
			.addClass("add-single-column px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm")
			.text("Add Single Column")
			.appendTo($controls);

		$("<button>")
			.addClass("add-two-columns px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm")
			.text("Add Two Columns")
			.appendTo($controls);
	}

	// contingut de la noticia
	const $content = $("<div>").addClass("news-content space-y-4").appendTo($article);

	if (item.sections && item.sections.length > 0) {
		item.sections.forEach((section) => {
			const $section = createSection(section);
			$content.append($section);
		});
	}

	// Crea l'element span per mostrar l'autor de la noticia
	$("<span>")
		.html(`By <span class="${canEdit ? "hover:bg-gray-50 p-1 rounded author editable" : ""}">${item.author}</span>`)
		.appendTo($meta);

	// Afegeix un separador entre els elements de metadades

	$("<span>").text("•").appendTo($meta);

	// Mostra la data de creacio de la
	$("<span>")
		.text(`Created: ${new Date(item.createdDate).toLocaleDateString()}`)
		.appendTo($meta);

	//unaltre separador
	$("<span>").text("•").appendTo($meta);

	//span que s'actualitza quan es modifica la noticia
	$("<span>")
		.text(`Modified: ${new Date(item.modifiedDate).toLocaleDateString()}`)
		.appendTo($meta);

	// mostra el text publicat o esborrany
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

	//si l'usuari pot editar, afegeix els botons necesaris
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

// funcio pper crear una nova section amb una o dues columnes
function createSection(section) {
	// Crea el contenidor principal de la section amb estils basics
	const $section = $("<div>").addClass("section mb-4 relative");

	// si l'usuari por editar, afefeix el boto d'eliminar section
	if (canEditNews()) {
		$("<button>")
			.addClass(
				"delete-section absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 z-10"
			)
			.html("×")
			.appendTo($section);
	}

	// configura el disseny de grid,  si es single osea una nomes, o de dues columnes
	if (section.type === "single") {
		$section.addClass("grid grid-cols-1");
	} else {
		$section.addClass("grid grid-cols-2 gap-4");
	}

	// estiles tailwind css
	const columnClass = canEditNews()
		? "column min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-2"
		: "column min-h-[100px] p-2";

	// per cada columna de la secció
	section.columns.forEach((column) => {
		const $column = $("<div>")
			.addClass(columnClass)
			.addClass("droppable")
			.attr("data-content-type", column.contentType || "empty")
			.appendTo($section);

		if (column.content) {
			if (column.contentType === "text") {
				$("<div>").addClass("editable p-2").text(column.content).appendTo($column);
			} else if (column.contentType === "image") {
				const $imgContainer = $("<div>").addClass("relative").appendTo($column);

				// si hi ha contingut, crea una imatge amb el src corresponent
				if (column.content) {
					$("<img>").addClass("w-full h-auto").attr("src", column.content).appendTo($imgContainer);
				} else {
					$("<button>")
						.addClass("upload-image-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2")
						.text("Upload Image")
						.appendTo($imgContainer);
				}

				const $img = $("<img>").addClass("w-full h-auto hidden").appendTo($imgContainer);
			}
		}
	});

	return $section;
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
	const newsItem = {
		id: id,
		title: "Nou Article",
		author: "Nom de l'Autor",
		createdDate: new Date().toISOString(),
		modifiedDate: new Date().toISOString(),
		sections: [],
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
		const $article = $(`article[data-id="${id}"]`);
		const sections = [];

		$article.find(".section").each(function () {
			const $section = $(this);
			const type = $section.hasClass("grid-cols-2") ? "double" : "single";
			const columns = [];

			$section.find(".column").each(function () {
				const $column = $(this);
				let contentType, content;

				const $img = $column.find("img:not(.hidden)");
				if ($img.length > 0 && $img.attr("src")) {
					contentType = "image";
					content = $img.attr("src");
				} else {
					const $text = $column.find(".editable");
					if ($text.length > 0) {
						contentType = "text";
						content = $text.text();
					} else {
						contentType = null;
						content = null;
					}
				}

				columns.push({ contentType, content });
			});

			sections.push({ type, columns });
		});

		news[index] = {
			...news[index],
			title: $article.find(".news-title").text(),
			author: $article.find(".author").text(),
			sections: sections,
			modifiedDate: new Date().toISOString(),
			status: status,
		};

		saveToStorage(news);

		const $statusIndicator = $article.find(".bg-green-100, .bg-gray-100");
		if (status === 1) {
			$statusIndicator
				.removeClass("bg-gray-100 text-gray-800")
				.addClass("bg-green-100 text-green-800")
				.text("Publicat");
		} else {
			$statusIndicator
				.removeClass("bg-green-100 text-green-800")
				.addClass("bg-gray-100 text-gray-800")
				.text("Esborrany");
		}
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

	// Inicialitza els blocs de contingut arrossegables
	if (canEditNews()) {
		$(".content-block").draggable({
			helper: "clone",
			revert: "invalid",
			cursor: "move",
			start: function (event, ui) {
				$(this).addClass("dragging");
			},
			stop: function (event, ui) {
				$(this).removeClass("dragging");
			},
		});

		// Inicialitza les columnes droppable
		$(document).on("mouseenter", ".column", function () {
			$(this).droppable({
				accept: ".content-block",
				hoverClass: "droppable-hover",
				drop: function (event, ui) {
					const contentType = $(ui.draggable).data("type");
					const $column = $(this);

					$column.empty();

					if (contentType === "text") {
						$("<div>")
							.addClass("editable p-2")
							.attr("contenteditable", "true")
							.text("Click to edit text")
							.appendTo($column);
					} else if (contentType === "image") {
						const $imgContainer = $("<div>").addClass("relative").appendTo($column);

						$("<button>")
							.addClass(
								"upload-image-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
							)
							.text("Upload Image")
							.appendTo($imgContainer);

						// afegeix l'element d'imatge ocult que es mostrara despres de cargar la pagina
						const $img = $("<img>").addClass("w-full h-auto hidden").appendTo($imgContainer);

						// la funcionalitat de pujada d'imatges sera gestionada pel controlador global de clics
					}

					$column.attr("data-content-type", contentType);
				},
			});
		});
	} else {
		// amaga els blocs de contingut per als no editors
		$(".editor-only").hide();
		$(".content-block").hide();
	}

	// amaga el boto d'afegir si no hi ha permisos
	const canEdit = canEditNews();
	$("#add-news-btn").toggle(canEdit);

	// gestors d'esdeveniments dels botons
	$("#add-news-btn").on("click", createNewArticle);

	$(document).on("click", ".add-single-column", function () {
		const $article = $(this).closest("article");
		const $content = $article.find(".news-content");

		const newSection = {
			type: "single",
			columns: [
				{
					contentType: null,
					content: null,
				},
			],
		};

		const $newSection = createSection(newSection);
		$content.append($newSection);
	});

	$(document).on("click", ".add-two-columns", function () {
		const $article = $(this).closest("article");
		const $content = $article.find(".news-content");

		const newSection = {
			type: "double",
			columns: [
				{ contentType: null, content: null },
				{ contentType: null, content: null },
			],
		};

		const $newSection = createSection(newSection);
		$content.append($newSection);
	});

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

	$(document).on("click", ".delete-section", function (e) {
		e.preventDefault();
		if (confirm("Are you sure you want to delete this section?")) {
			$(this).closest(".section").remove();
		}
	});

	// fer el text editable amb doble clic
	$(document).on("dblclick", ".editable", function () {
		if (canEditNews()) {
			$(this).attr("contenteditable", "true").focus();
		}
	});

	// Guarda el contingut quan es perd el focus
	$(document).on("blur", ".editable", function () {
		if (canEditNews()) {
			$(this).removeAttr("contenteditable");
		}
	});

	$(document).on("click", ".upload-image-btn", function () {
		const $imgContainer = $(this).closest(".relative");
		const $button = $(this);

		// crea un input de fitxer ocult
		const $fileInput = $("<input>").attr("type", "file").attr("accept", "image/*").css("display", "none");

		// afegeix l'input temporalment al DOM
		$imgContainer.append($fileInput);

		// obre el quadre de diàleg de fitxers
		$fileInput.trigger("click");

		// gestiona la seleccio de fitxers
		$fileInput.on("change", function (e) {
			const file = this.files[0];
			if (file) {
				const reader = new FileReader();

				reader.onload = function (e) {
					// crea o obten l'element d'imatge existent
					let $img = $imgContainer.find("img");
					if ($img.length === 0) {
						$img = $("<img>").addClass("w-full h-auto");
						$imgContainer.append($img);
					}

					// actualitza la font de la imatge i la mostra
					$img.removeClass("hidden").attr("src", e.target.result);

					// elimina el boto de pujada i l'input de fitxer
					$button.remove();
					$fileInput.remove();
				};

				reader.readAsDataURL(file);
			}

			// neteja l'input de fitxer temporal no es necesari pero aixi no s'omple de memoria basura
			$fileInput.remove();
		});
	});

	// render incial
	renderNews();
});
