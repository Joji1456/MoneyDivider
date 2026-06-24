fetch(API_BASE + "/groups")
.then(res => res.json())
.then(data => {
    document.getElementById("groups")
            .innerHTML = data.length;
});

fetch(API_BASE + "/expenses")
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