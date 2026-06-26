// Settlements Page - View all settlements
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

// Load settlements on page load
fetch(API_BASE + "/settlements")
.then(res => res.json())
.then(data => {
    let rows = "";
    data.forEach(s => {
        rows += `<tr>
            <td>${s.fromUser}</td>
            <td>${s.toUser}</td>
            <td>₹${s.amount}</td>
            <td><span class="badge bg-${s.status === 'PAID' ? 'success' : 'warning'}">${s.status}</span></td>
        </tr>`;
    });
    document.getElementById("settlementTable").innerHTML = rows || "<tr><td colspan='4'>No settlements yet.</td></tr>";
})
.catch(() => {});
