// Groups Page - Create groups with minimum 2 members
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

loadGroups();

// Add extra member name input
function addMemberInput() {
    const count = document.querySelectorAll(".member-name").length + 1;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control mb-2 member-name";
    input.placeholder = "Member " + count + " Name";
    document.getElementById("memberInputs").appendChild(input);
}

function loadGroups() {
    fetch(API_BASE + "/groups")
    .then(res => res.json())
    .then(data => {
        let rows = "";
        data.forEach(g => {
            const members = g.members ? g.members.map(m => m.name).join(", ") : "-";
            rows += `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>📁 <strong>${g.groupName}</strong> &nbsp; <small class="text-muted">Members: ${members}</small></span>
                <span class="badge bg-primary">ID: ${g.id}</span>
            </li>`;
        });
        document.getElementById("groupList").innerHTML = rows || "<li class='list-group-item'>No groups yet.</li>";
    })
    .catch(() => {});
}

document.getElementById("groupForm")
.addEventListener("submit", function (e) {
    e.preventDefault();

    const names = [...document.querySelectorAll(".member-name")].map(i => i.value.trim()).filter(v => v);

    if (names.length < 2) {
        alert("Please add at least 2 members.");
        return;
    }

    // Find or register users by name
    const memberPromises = names.map(name =>
        fetch(API_BASE + "/users")
        .then(res => res.json())
        .then(users => {
            const existing = users.find(u => u.name.toLowerCase() === name.toLowerCase());
            if (existing) return existing;
            // Register as new user with name and default credentials
            return fetch(API_BASE + "/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, email: name.toLowerCase().replace(/\s+/g,".")+"@group.com", password: "member123" })
            }).then(r => r.json());
        })
    );

    Promise.all(memberPromises).then(members => {
        const memberIds = members.map(m => m.id).filter(id => id);

        const group = {
            groupName: document.getElementById("groupName").value,
            createdBy: user.id,
            members: memberIds.map(id => ({ id }))
        };

        return fetch(API_BASE + "/groups", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(group)
        });
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("groupForm").reset();
        // Reset member inputs to 2
        document.getElementById("memberInputs").innerHTML = `
            <input type="text" class="form-control mb-2 member-name" placeholder="Member 1 Name" required>
            <input type="text" class="form-control mb-2 member-name" placeholder="Member 2 Name" required>`;
        loadGroups();
        alert("Group created successfully!");
    })
    .catch(() => alert("Failed to create group"));
});
