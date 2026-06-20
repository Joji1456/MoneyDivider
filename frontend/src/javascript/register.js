document.getElementById("registerForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    const user = {
        name:
            document.getElementById("name").value,
        email:
            document.getElementById("email").value,
        password:
            document.getElementById("password").value
    };

    fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(() => {

        alert("Registration Successful");

        window.location = "index.html";
    });
});