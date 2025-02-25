$(document).ready(function () {
	const users = JSON.parse(localStorage.getItem("user")) || [];
	const adminUser = users.find((user) => user.name === "admin");
	if (adminUser) {
		adminUser.active = true;
		localStorage.setItem("user", JSON.stringify(users));
	}

	const $container = $("<div>", { class: "container" });
	const $title = $("<h1>", { text: "User Management", class: "title" });

	const $table = $("<table>", { class: "user-table" }).append(
		$("<thead>").append(
			$("<tr>").append(
				$("<th>", { text: "ID" }),
				$("<th>", { text: "Username" }),
				$("<th>", { text: "Email" }),
				$("<th>", { text: "Edit Users" }),
				$("<th>", { text: "Edit News" }),
				$("<th>", { text: "Edit Files" }),
				$("<th>", { text: "Actions" })
			)
		),
		$("<tbody>")
	);

	$.each(users, function (userKey, userValue) {
		var $row = $("<tr>").append(
			$("<td>", { text: userValue.id }),
			$("<td>", { text: userValue.name }),
			$("<td>", { text: userValue.email }),
			$("<td>", { class: "checkbox-cell" }).append(
				$("<input>", {
					type: "checkbox",
					checked: userValue.edit_users,
					disabled: userValue.name === "admin",
				})
			),
			$("<td>", { class: "checkbox-cell" }).append(
				$("<input>", {
					type: "checkbox",
					checked: userValue.edit_news,
					disabled: userValue.name === "admin",
				})
			),
			$("<td>", { class: "checkbox-cell" }).append(
				$("<input>", {
					type: "checkbox",
					checked: userValue.edit_bone_files,
					disabled: userValue.name === "admin",
				})
			),
			$("<td>").append(
				$("<button>", {
					text: "Delete",
					class: "delete-button",
					"data-id": userValue.id,
					disabled: userValue.name === "admin",
				})
			)
		);
		$table.find("tbody").append($row);
	});

	$container.append($title, $table);
	$("#main-content").append($container);

	$(document).on("click", ".delete-button", function () {
		if (confirm("Are you sure you want to delete this user?")) {
			const userId = $(this).data("id");
			const userIndex = users.findIndex((user) => user.id === userId);
			if (userIndex !== -1) {
				users.splice(userIndex, 1);
				localStorage.setItem("user", JSON.stringify(users));
				$(this)
					.closest("tr")
					.fadeOut(300, function () {
						$(this).remove();
					});
			}
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
			localStorage.setItem("user", JSON.stringify(users));
		}
	});
});
