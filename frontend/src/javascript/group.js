loadGroups();

function loadGroups() {

    fetch("http://localhost:8080/groups")
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(g => {

            rows += `
            <tr>
                <td>${g.id}</td>
                <td>${g.groupName}</td>
            </tr>`;
        });

        document
            .getElementById("groupTable")
            .innerHTML = rows;
    });
}

document.getElementById("groupForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    const group = {
        groupName:
        document.getElementById("groupName").value,
        createdBy: 1
    };

    fetch("http://localhost:8080/groups", {

        method: "POST",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify(group)

    }).then(() => {
        loadGroups();
    });
});