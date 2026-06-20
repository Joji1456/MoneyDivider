fetch("http://localhost:8080/groups")
.then(res => res.json())
.then(data => {
    document.getElementById("groups")
            .innerHTML = data.length;
});

fetch("http://localhost:8080/expenses")
.then(res => res.json())
.then(data => {

    document.getElementById("expenses")
            .innerHTML = data.length;

    let total = 0;

    data.forEach(e => {
        total += e.amount;
    });

    document.getElementById("pending")
            .innerHTML = "₹" + total;
});