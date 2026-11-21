// Випадкове ціле число від 1 до 99
function randomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}

// Заповнення таблиці
function fillTable() {
    let rows = document.getElementById("num-table").rows;

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].cells.length; j++) {
            let cell = rows[i].cells[j];

            if (i === j) {                         // головна діагональ
                cell.textContent = 0;
                cell.className = "zero";
            } else if ((i + 1) % 2 === 0) {        // парні рядки (2, 4, 6)
                cell.textContent = -randomNumber();
                cell.className = "negative";
            } else {                               // непарні рядки (1, 3, 5)
                cell.textContent = randomNumber();
                cell.className = "positive";
            }
        }
    }
}

// Очищення таблиці
function clearTable() {
    let cells = document.getElementById("num-table").getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cells[i].className = "";
    }
}
