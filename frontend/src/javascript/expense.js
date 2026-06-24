document.getElementById("expenseForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    const request = {
        expense: {
            title:
            document.getElementById("title").value,
            amount:
            document.getElementById("amount").value,
            paidBy: 1,
            groupId: 1,
            splitType: "EQUAL"
        },
        memberIds: [1,2,3,4]
    };

    fetch(API_BASE + "/expenses", {

        method: "POST",

        headers: {
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify(request)

    })
    .then(() => {
        alert("Expense Added");
    });
});