$(document).ready(function () {
	const users = JSON.parse(localStorage.getItem("user")) || [];

	console.log(users);

	// {
	// 	"id": 1,
	// 	"name": "admin",
	// 	"email": "desenvolupador@iesjoanramis.org",
	// 	"password_hash": "f50897231cd7b37ae4e96b08c32f8cc287f9459982dbfe8a1722af46b0657583",
	// 	"salt_hash": "1c964b77d055a3a8b99f277faae12f3d",
	// 	"edit_users": true,
	// 	"edit_news": true,
	// 	"edit_bone_files": true,
	// 	"active": true,
	// 	"is_first_login": true
	// }

	// function saveUsers(users) {
	// 	localStorage.setItem("user", JSON.stringify(users));
	// }

	const $container = $("<div>", { class: "container" });

	const $title = $("<h1>", { text: "Edit Users", class: "title" });

	const $table = $("<table>", { class: "user-table" }).append(
		$("<thead>").append(
			$("<tr>").append(
				$("<th>", { text: "ID" }),
				$("<th>", { text: "Username" }),
				$("<th>", { text: "Email" }),
				$("<th>", { text: "Edit Users" }),
				$("<th>", { text: "Edit News" }),
				$("<th>", { text: "Edit Bone Files" })
			)
		),
		$("<tbody>")
	);

	$.each(users, function (userKey, userValue) {
		const $row = $("<tr>").append(
			$("<td>", { text: userValue.id }),
			$("<td>", { text: userValue.name }),
			$("<td>", { text: userValue.email }),
			$("<td>").append($("<input>", { type: "checkbox", checked: userValue.edit_users, disabled: true })),
			$("<td>").append($("<input>", { type: "checkbox", checked: userValue.edit_news, disabled: true })),
			$("<td>").append($("<input>", { type: "checkbox", checked: userValue.edit_bone_files, disabled: true }))
		);
		$table.find("tbody").append($row);
	});

	// usersArr.forEach((user) => {
	// 	const $row = $("<tr>").append(
	// 		$("<td>", { text: user.id }),
	// 		$("<td>", { text: user.name }),
	// 		$("<td>", { text: user.email }),
	// 		$("<td>", { text: user.edit_users ? "Yes" : "No" }),
	// 		$("<td>", { text: user.edit_news ? "Yes" : "No" }),
	// 		$("<td>", { text: user.edit_bone_files ? "Yes" : "No" }),
	// 		$("<td>").append($("<button>", { text: "Edit", class: "edit-button", "data-id": user.id }))
	// 	);
	// 	$table.find("tbody").append($row);
	// });

	$container.append($title, $table);
	$("#main-content").append($container);

	// $(document).on("click", ".edit-button", function () {
	// 	const userId = $(this).data("id");

	// 	const $form = $("<form>", { id: "edit-user-form", class: "form" }).append(
	// 		$("<div>", { class: "form-group" }).append(
	// 			$("<label>", { for: "username", text: "Username", class: "label" }),
	// 			$("<input>", { type: "text", id: "username", name: "username", class: "input", value: user.name })
	// 		),
	// 		$("<div>", { class: "form-group" }).append(
	// 			$("<label>", { for: "email", text: "Email", class: "label" }),
	// 			$("<input>", { type: "email", id: "email", name: "email", class: "input", value: user.email })
	// 		),
	// 		$("<div>", { class: "form-group" }).append(
	// 			$("<label>", { text: "Permissions", class: "label" }),
	// 			$("<div>").append(
	// 				$("<input>", { type: "checkbox", id: "edit_users", name: "edit_users", checked: user.edit_users }),
	// 				$("<label>", { for: "edit_users", text: "Edit Users" })
	// 			),
	// 			$("<div>").append(
	// 				$("<input>", { type: "checkbox", id: "edit_news", name: "edit_news", checked: user.edit_news }),
	// 				$("<label>", { for: "edit_news", text: "Edit News" })
	// 			),
	// 			$("<div>").append(
	// 				$("<input>", { type: "checkbox", id: "edit_bone_files", name: "edit_bone_files", checked: user.edit_bone_files }),
	// 				$("<label>", { for: "edit_bone_files", text: "Edit Bone Files" })
	// 			)
	// 		),
	// 		$("<button>", { type: "submit", text: "Save", class: "button" })
	// 	);

	// 	$("#main-content").html($form);

	// 	$("#edit-user-form").on("submit", function (event) {
	// 		event.preventDefault();
	// 		user.name = $("#username").val();
	// 		user.email = $("#email").val();
	// 		user.edit_users = $("#edit_users").is(":checked");
	// 		user.edit_news = $("#edit_news").is(":checked");
	// 		user.edit_bone_files = $("#edit_bone_files").is(":checked");
	// 		saveUsers(users);
	// 		alert(`User ${user.name} with email ${user.email} has been saved.`);
	// 		location.reload();
	// 	});
	// });
});
