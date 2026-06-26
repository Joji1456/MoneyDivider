// Login Page - Handles user authentication
document.getElementById("loginForm")
.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    // Send login request to backend
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
        if (!data || data.error) {
            alert("Invalid email or password");
            return;
        }
        // Save logged-in user to localStorage and redirect to dashboard
        localStorage.setItem("user", JSON.stringify(data));
        window.location = "dashboard.html";
    })
    .catch(err => {
        if (err.message === "Failed to fetch") {
            alert("Cannot connect to server. Please try again in a moment.");
        } else {
            alert(err.message);
        }
    });
});
