// Expenses Page - Add and view expenses
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

// Load groups into dropdown and load expense history on page load
loadGroupOptions();
loadExpenses();

function loadGroupOptions() {
    fetch(API_BASE + "/groups")
    .then(res => res.json())
    .then(data => {
        let options = "<option value=''>-- Select Group --</option>";
        data.forEach(g => {
            options += `<option value="${g.id}">${g.groupName}</option>`;
        });
        document.getElementById("groupId").innerHTML = options;
    })
    .catch(() => {});
}

function loadExpenses() {
    fetch(API_BASE + "/expenses")
    .then(res => res.json())
    .then(data => {
        let rows = "";
        data.forEach(e => {
            rows += `<tr>
                <td>${e.description}</td>
                <td>₹${e.amount}</td>
                <td>${e.payerId}</td>
                <td>${e.groupId}</td>
            </tr>`;
        });
        document.getElementById("expenseTable").innerHTML = rows || "<tr><td colspan='4'>No expenses yet.</td></tr>";
    })
    .catch(() => {});
}

// Add new expense using logged-in user as payer
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
        loadGroupOptions();
        loadExpenses();
        alert("Expense Added!");
    })
    .catch(() => alert("Failed to add expense"));
});
