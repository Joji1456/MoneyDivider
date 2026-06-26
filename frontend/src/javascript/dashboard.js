const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location = "index.html";

document.getElementById("userName").innerText = user.name;

fetch(API_BASE + "/groups")
    .then(res => res.json())
    .then(data => document.getElementById("groups").innerText = data.length)
    .catch(() => {});

fetch(API_BASE + "/expenses")
    .then(res => res.json())
    .then(data => {
        document.getElementById("expenses").innerText = data.length;
        let total = 0;
        data.forEach(e => total += e.amount);
        document.getElementById("pending").innerText = "₹" + total.toFixed(2);
    })
    .catch(() => {});
