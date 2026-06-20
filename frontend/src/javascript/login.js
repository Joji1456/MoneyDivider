document.getElementById("loginForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {

        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );

        window.location =
            "dashboard.html";
    });
});