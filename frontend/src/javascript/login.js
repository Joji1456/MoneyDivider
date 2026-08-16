// Login Page - Handles user authentication
const errorMsg = document.getElementById("errorMsg");

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove("d-none");
}

document.getElementById("loginForm")
.addEventListener("submit", function (e) {
    e.preventDefault();
    errorMsg.classList.add("d-none");

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch(API_BASE + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error("Invalid email or password");
        return res.json();
    })
    .then(data => {
        if (!data || data.error) { showError("Invalid email or password"); return; }
        localStorage.setItem("user", JSON.stringify(data));
        window.location = "dashboard.html";
    })
    .catch(err => {
        showError(err.message === "Failed to fetch"
            ? "Cannot connect to server. Please try again in a moment."
            : err.message);
    });
});
