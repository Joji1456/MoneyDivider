fetch(
"http://localhost:8080/settlements"
)
.then(res => res.json())
.then(data => {

    let rows = "";

    data.forEach(s => {

        rows += `
        <tr>
            <td>${s.fromUser}</td>
            <td>${s.toUser}</td>
            <td>₹${s.amount}</td>
            <td>${s.status}</td>
        </tr>`;
    });

    document
    .getElementById("settlementTable")
    .innerHTML = rows;
});