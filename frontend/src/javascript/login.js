document.getElementById("loginForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

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
        if (!res.ok) {
            throw new Error("Invalid email or password");
        }
        return res.json();
    })
    .then(data => {
        if (!data || data.error) {
            alert("Invalid email or password");
            return;
        }
        localStorage.setItem("user", JSON.stringify(data));
        window.location = "dashboard.html";
    })
    .catch(err => {
        alert(err.message);
    });
});
