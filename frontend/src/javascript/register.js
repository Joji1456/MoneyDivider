document.getElementById("registerForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

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
        if (!res.ok) {
            return res.text().then(msg => { throw new Error(msg || "Registration failed"); });
        }
        return res.json();
    })
    .then(() => {
        alert("Registration Successful");
        window.location = "index.html";
    })
    .catch(err => {
        alert("Registration failed: " + (err.message.includes("Email already in use") ? "Email already registered." : err.message));
    });
});
