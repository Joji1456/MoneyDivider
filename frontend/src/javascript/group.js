// Groups Page - Create and view groups
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

// Load all groups on page load
loadGroups();

function loadGroups() {
    fetch(API_BASE + "/groups")
    .then(res => res.json())
    .then(data => {
        let rows = "";
        data.forEach(g => {
            rows += `<li class="list-group-item d-flex justify-content-between">
                <span>📁 ${g.groupName}</span>
                <span class="badge bg-primary">ID: ${g.id}</span>
            </li>`;
        });
        document.getElementById("groupList").innerHTML = rows || "<li class='list-group-item'>No groups yet.</li>";
    })
    .catch(() => {});
}

// Create new group using logged-in user's id
document.getElementById("groupForm")
.addEventListener("submit", function (e) {
    e.preventDefault();

    const group = {
        groupName: document.getElementById("groupName").value,
        createdBy: user.id
    };

    fetch(API_BASE + "/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(group)
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("groupName").value = "";
        loadGroups();
    })
    .catch(() => alert("Failed to create group"));
});
