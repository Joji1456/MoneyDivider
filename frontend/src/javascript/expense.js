// Expenses Page - Add and view expenses with per-person split
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

loadGroupOptions();
loadExpenses();

function loadGroupOptions() {
    fetch(API_BASE + "/groups")
    .then(res => res.json())
    .then(data => {
        let options = "<option value=''>-- Select Group --</option>";
        data.forEach(g => {
            options += `<option value="${g.id}" data-members="${g.members ? g.members.length : 1}">${g.groupName}</option>`;
        });
        document.getElementById("groupId").innerHTML = options;
        // Update split preview when group changes
        document.getElementById("groupId").onchange = updateSplitPreview;
        document.getElementById("amount").oninput = updateSplitPreview;
    })
    .catch(() => {});
}

function updateSplitPreview() {
    const groupSelect = document.getElementById("groupId");
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    const selectedOption = groupSelect.options[groupSelect.selectedIndex];
    const memberCount = parseInt(selectedOption.getAttribute("data-members")) || 1;

    if (amount > 0 && memberCount > 0) {
        const perPerson = (amount / memberCount).toFixed(2);
        document.getElementById("splitPreview").innerHTML =
            `<div class="alert alert-info mt-2">💡 Total ₹${amount} ÷ ${memberCount} members = <strong>₹${perPerson} per person</strong></div>`;
    } else {
        document.getElementById("splitPreview").innerHTML = "";
    }
}

function loadExpenses() {
    fetch(API_BASE + "/expenses")
    .then(res => res.json())
    .then(data => {
        // Fetch all groups to get member counts
        fetch(API_BASE + "/groups")
        .then(res => res.json())
        .then(groups => {
            let rows = "";
            let grandTotal = 0;
            data.forEach(e => {
                const group = groups.find(g => g.id === e.groupId);
                const memberCount = group && group.members ? group.members.length : 1;
                const perPerson = (e.amount / memberCount).toFixed(2);
                const groupName = group ? group.groupName : "Group " + e.groupId;
                grandTotal += e.amount;
                rows += `<tr>
                    <td>${e.description}</td>
                    <td>₹${e.amount}</td>
                    <td>${groupName}</td>
                    <td>${memberCount} people</td>
                    <td><strong>₹${perPerson}</strong></td>
                </tr>`;
            });
            document.getElementById("expenseTable").innerHTML = rows || "<tr><td colspan='5' class='text-center'>No expenses yet.</td></tr>";
            document.getElementById("grandTotal").innerText = "₹" + grandTotal.toFixed(2);
        });
    })
    .catch(() => {});
}

document.getElementById("expenseForm")
.addEventListener("submit", function (e) {
    e.preventDefault();

    const expense = {
        description: document.getElementById("description").value,
        amount: parseFloat(document.getElementById("amount").value),
        payerId: user.id,
        groupId: parseInt(document.getElementById("groupId").value)
    };

    fetch(API_BASE + "/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("expenseForm").reset();
        document.getElementById("splitPreview").innerHTML = "";
        loadGroupOptions();
        loadExpenses();
    })
    .catch(() => alert("Failed to add expense"));
});
