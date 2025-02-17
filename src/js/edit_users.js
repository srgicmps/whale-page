$(document).ready(function () {
	const users = JSON.parse(localStorage.getItem("user")) || [];

	console.log(users);

	function saveUsers(users) {
		localStorage.setItem("user", JSON.stringify(users));
	}

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
				$("<th>", { text: "Edit Bone Files" }),
				$("<th>", { text: "Actions" })
			)
		),
		$("<tbody>")
	);

	$.each(users, function (userKey, userValue) {
		const $row = $("<tr>").append(
			$("<td>", { text: userValue.id }),
			$("<td>", { text: userValue.name }),
			$("<td>", { text: userValue.email }),
			$("<td>").append($("<input>", { type: "checkbox", checked: userValue.edit_users, disabled: false })),
			$("<td>").append($("<input>", { type: "checkbox", checked: userValue.edit_news, disabled: false })),
			$("<td>").append($("<input>", { type: "checkbox", checked: userValue.edit_bone_files, disabled: false })),
			$("<td>").append($("<button>", { text: "Delete", class: "delete-button", "data-id": userValue.id }))
		);
		$table.find("tbody").append($row);
	});

	$container.append($title, $table);
	$("#main-content").append($container);

	$(document).on("click", ".delete-button", function () {
		const userId = $(this).data("id");
		const userIndex = users.findIndex((user) => user.id === userId);
		if (userIndex !== -1) {
			users.splice(userIndex, 1);
			saveUsers(users);
			location.reload();
		}
	});

	$(document).on("change", "input[type='checkbox']", function () {
		const $row = $(this).closest("tr");
		const userId = $row.find(".delete-button").data("id");
		const user = users.find((user) => user.id === userId);
		if (user) {
			user.edit_users = $row.find("input[type='checkbox']").eq(0).is(":checked");
			user.edit_news = $row.find("input[type='checkbox']").eq(1).is(":checked");
			user.edit_bone_files = $row.find("input[type='checkbox']").eq(2).is(":checked");
			saveUsers(users);
		}
	});
});
