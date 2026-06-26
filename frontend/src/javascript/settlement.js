// Settlements Page - Create and manage settlements
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

loadSettlements();

function loadSettlements() {
    fetch(API_BASE + "/settlements")
    .then(res => res.json())
    .then(data => {
        // Count pending and paid
        const pendingCount = data.filter(s => s.status !== "PAID").length;
        const paidCount = data.filter(s => s.status === "PAID").length;

        // Show summary counts
        document.getElementById("pendingCount").innerText = pendingCount;
        document.getElementById("paidCount").innerText = paidCount;

        let rows = "";
        data.forEach(s => {
            const isPaid = s.status === "PAID";
            rows += `<tr>
                <td>User ${s.fromUser}</td>
                <td>User ${s.toUser}</td>
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
