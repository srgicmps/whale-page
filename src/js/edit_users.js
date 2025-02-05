$(document).ready(function () {
	// Sample users data
	const defaultUsers = [
		{ id: 1, username: "user1", email: "user1@example.com", role: "admin" },
		{ id: 2, username: "user2", email: "user2@example.com", role: "editor" },
		{ id: 3, username: "user3", email: "user3@example.com", role: "viewer" },
	];

	// Load users from localStorage or use default users
	const users = JSON.parse(localStorage.getItem("users")) || defaultUsers;

	// Save users to localStorage
	function saveUsers(users) {
		localStorage.setItem("users", JSON.stringify(users));
	}

	const $container = $("<div>", { class: "container" });

	const $title = $("<h1>", { text: "Edit Users", class: "title" });

	const $table = $("<table>", { class: "user-table" }).append(
		$("<thead>").append(
			$("<tr>").append($("<th>", { text: "ID" }), $("<th>", { text: "Username" }), $("<th>", { text: "Email" }), $("<th>", { text: "Role" }), $("<th>", { text: "Actions" }))
		),
		$("<tbody>")
	);

	users.forEach((user) => {
		const $row = $("<tr>").append(
			$("<td>", { text: user.id }),
			$("<td>", { text: user.username }),
			$("<td>", { text: user.email }),
			$("<td>", { text: user.role }),
			$("<td>").append($("<button>", { text: "Edit", class: "edit-button", "data-id": user.id }))
		);
		$table.find("tbody").append($row);
	});

	$container.append($title, $table);
	$("#main-content").append($container);

	$(document).on("click", ".edit-button", function () {
		const userId = $(this).data("id");
		const user = users.find((u) => u.id === userId);

		const $form = $("<form>", { id: "edit-user-form", class: "form" }).append(
			$("<div>", { class: "form-group" }).append(
				$("<label>", { for: "username", text: "Username", class: "label" }),
				$("<input>", { type: "text", id: "username", name: "username", class: "input", value: user.username })
			),
			$("<div>", { class: "form-group" }).append(
				$("<label>", { for: "email", text: "Email", class: "label" }),
				$("<input>", { type: "email", id: "email", name: "email", class: "input", value: user.email })
			),
			$("<div>", { class: "form-group" }).append(
				$("<label>", { for: "role", text: "Role", class: "label" }),
				$("<select>", { id: "role", name: "role", class: "select" }).append(
					$("<option>", { value: "admin", text: "Admin", selected: user.role === "admin" }),
					$("<option>", { value: "editor", text: "Editor", selected: user.role === "editor" }),
					$("<option>", { value: "viewer", text: "Viewer", selected: user.role === "viewer" })
				)
			),
			$("<button>", { type: "submit", text: "Save", class: "button" })
		);

		$("#main-content").html($form);

		$("#edit-user-form").on("submit", function (event) {
			event.preventDefault();
			user.username = $("#username").val();
			user.email = $("#email").val();
			user.role = $("#role").val();
			saveUsers(users);
			alert(`User ${user.username} with email ${user.email} and role ${user.role} has been saved.`);
			location.reload();
		});
	});
});
