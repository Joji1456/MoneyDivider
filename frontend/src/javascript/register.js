// Register Page - Handles new user registration
document.getElementById("registerForm")
.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    // Send registration request to backend
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
        // Show specific error messages to user
        if (err.message.includes("Email already in use")) {
            alert("This email is already registered. Please login.");
        } else if (err.message === "Failed to fetch") {
            alert("Cannot connect to server. Please try again in a moment.");
        } else {
            alert("Registration failed: " + err.message);
        }
    });
});
