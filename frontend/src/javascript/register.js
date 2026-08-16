// Register Page - Handles new user registration
const errorMsg = document.getElementById("errorMsg");

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove("d-none");
}

document.getElementById("registerForm")
.addEventListener("submit", function (e) {
    e.preventDefault();
    errorMsg.classList.add("d-none");

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch(API_BASE + "/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    .then(res => {
        if (!res.ok) return res.text().then(msg => { throw new Error(msg); });
        return res.json();
    })
    .then(() => {
        alert("Registration Successful! Please login.");
        window.location = "index.html";
    })
    .catch(err => {
        if (err.message.includes("Email already in use")) {
            showError("This email is already registered. Please login.");
        } else if (err.message === "Failed to fetch") {
            showError("Cannot connect to server. Please try again in a moment.");
        } else {
            showError("Registration failed: " + err.message);
        }
    });
});
