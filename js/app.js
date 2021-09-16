let table = document.getElementById("table");
let tableBody = table.getElementsByTagName("tbody")[0];
let sortButton = document.getElementById("sort");
let intervalId = null;

function resetTable() {
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function compare(a, b) {
    let value = b.accountBalance - a.accountBalance;
    if (value == 0) {
        return (Number(a.id) - Number(b.id));
    } else {
        return value;
    }
}

function setTableData(data) {
    resetTable();
    data.map((user) => {
        const row = tableBody.insertRow();
        const name = row.insertCell();
        const email = row.insertCell();
        const phone = row.insertCell();
        const picture = row.insertCell();
        const balance = row.insertCell();



        name.textContent = `${user.name.title} ${user.name.last} ${user.name.first}`;
        name.className = "text-truncate";
        name.style = "max-width: 200px;";

        email.textContent = `${user.email}`;

        phone.textContent = `${user.phone}`;
        phone.className = "text-truncate";
        phone.style = "max-width: 200px;";

        const image = document.createElement('img');
        image.src = user.pictureUrl;
        image.className = "rounded";
        picture.appendChild(image);

        balance.textContent = `${user.accountBalance}`;
    });
}

function addTableData() {
    setTableData(USERS);
}

function startRandom() {
    sortButton.disabled = true;
    intervalId = setInterval(() => {
        setTableData([...USERS].sort(() => Math.random() - 0.5));
    }, 1000);
}

function stopRandom() {
    if (intervalId != null) {
        sortButton.disabled = false;
        clearInterval(intervalId);
        intervalId = null;
    }
}

function sortData() {
    setTableData([...USERS].sort(compare));
}