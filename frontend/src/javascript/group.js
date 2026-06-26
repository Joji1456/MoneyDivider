// Groups Page - Create groups with minimum 2 members
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

loadGroups();

// Add extra member email input
function addMemberInput() {
    const count = document.querySelectorAll(".member-email").length + 1;
    const input = document.createElement("input");
    input.type = "email";
    input.className = "form-control mb-2 member-email";
    input.placeholder = "Member " + count + " Email";
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

    const emails = [...document.querySelectorAll(".member-email")].map(i => i.value.trim()).filter(v => v);

    if (emails.length < 2) {
        alert("Please add at least 2 members.");
        return;
    }

    // First register/find all member users, then create group
    const memberPromises = emails.map(email =>
        fetch(API_BASE + "/users")
        .then(res => res.json())
        .then(users => {
            const existing = users.find(u => u.email === email);
            if (existing) return existing;
            // Register as new user with default password
            return fetch(API_BASE + "/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: email.split("@")[0], email: email, password: "member123" })
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
            <input type="email" class="form-control mb-2 member-email" placeholder="Member 1 Email" required>
            <input type="email" class="form-control mb-2 member-email" placeholder="Member 2 Email" required>`;
        loadGroups();
        alert("Group created successfully!");
    })
    .catch(() => alert("Failed to create group"));
});
