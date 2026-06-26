// Settlements Page - Create and manage settlements
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

let usersMap = {};

// Load users first, then settlements
fetch(API_BASE + "/users")
.then(res => res.json())
.then(users => {
    users.forEach(u => usersMap[u.id] = u.name);
    loadSettlements();
})
.catch(() => loadSettlements());

function loadSettlements() {
    fetch(API_BASE + "/settlements")
    .then(res => res.json())
    .then(data => {
        const pendingList = data.filter(s => s.status !== "PAID");
        const paidList = data.filter(s => s.status === "PAID");

        // Update summary cards
        document.getElementById("pendingCount").innerText = pendingList.length;
        document.getElementById("paidCount").innerText = paidList.length;

        // Show pending peoples names
        document.getElementById("pendingPeople").innerHTML = pendingList.length
            ? pendingList.map(s => `<span class="badge bg-warning text-dark me-1">${usersMap[s.fromUser] || "User "+s.fromUser} → ${usersMap[s.toUser] || "User "+s.toUser} (₹${s.amount})</span>`).join("")
            : "<small class='text-muted'>None</small>";

        // Show paid peoples names
        document.getElementById("paidPeople").innerHTML = paidList.length
            ? paidList.map(s => `<span class="badge bg-success me-1">${usersMap[s.fromUser] || "User "+s.fromUser} → ${usersMap[s.toUser] || "User "+s.toUser} (₹${s.amount})</span>`).join("")
            : "<small class='text-muted'>None</small>";

        let rows = "";
        data.forEach(s => {
            const isPaid = s.status === "PAID";
            const fromName = usersMap[s.fromUser] || "User " + s.fromUser;
            const toName = usersMap[s.toUser] || "User " + s.toUser;
            rows += `<tr>
                <td>${fromName}</td>
                <td>${toName}</td>
                <td>₹${s.amount}</td>
                <td><span class="badge bg-${isPaid ? 'success' : 'warning'}">${isPaid ? 'PAID' : 'PENDING'}</span></td>
                <td>${isPaid ? '<span class="text-success">✔ Done</span>' : `<button class="btn btn-sm btn-success" onclick="markPaid(${s.id})">Mark Paid</button>`}</td>
            </tr>`;
        });
        document.getElementById("settlementTable").innerHTML = rows || "<tr><td colspan='5' class='text-center'>No settlements yet.</td></tr>";
    })
    .catch(() => {});
}

function markPaid(id) {
    fetch(API_BASE + "/settlements/" + id + "/PAID", { method: "PUT" })
    .then(() => loadSettlements())
    .catch(() => alert("Failed to update settlement"));
}

document.getElementById("settlementForm")
.addEventListener("submit", function (e) {
    e.preventDefault();

    const settlement = {
        fromUser: parseInt(document.getElementById("fromUser").value),
        toUser: parseInt(document.getElementById("toUser").value),
        amount: parseFloat(document.getElementById("amount").value),
        status: "PENDING"
    };

    fetch(API_BASE + "/settlements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settlement)
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("settlementForm").reset();
        loadSettlements();
    })
    .catch(() => alert("Failed to create settlement"));
});
