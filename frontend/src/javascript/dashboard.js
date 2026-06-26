// Dashboard Page - Shows summary of groups, expenses and total amount
const user = JSON.parse(localStorage.getItem("user"));

// Redirect to login if not logged in
if (!user) window.location = "index.html";

// Display logged-in user's name
document.getElementById("userName").innerText = user.name;

// Fetch and display total number of groups
fetch(API_BASE + "/groups")
    .then(res => res.json())
    .then(data => document.getElementById("groups").innerText = data.length)
    .catch(() => document.getElementById("groups").innerText = "0");

// Fetch and display total expenses and total amount spent
fetch(API_BASE + "/expenses")
    .then(res => res.json())
    .then(data => {
        document.getElementById("expenses").innerText = data.length;
        let total = 0;
        data.forEach(e => total += e.amount);
        document.getElementById("pending").innerText = "₹" + total.toFixed(2);
    })
    .catch(() => {
        document.getElementById("expenses").innerText = "0";
        document.getElementById("pending").innerText = "₹0.00";
    });
