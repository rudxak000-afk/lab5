// Отримуємо елементи сторінки
const fruitSelect = document.getElementById("fruit-select");
const priceInput = document.getElementById("price-input");
const fruitList = document.getElementById("fruit-list");
const errorBox = document.getElementById("error");

// Додавання фрукта та його вартості до списку
function addFruit() {
    let fruit = fruitSelect.value;
    let price = parseFloat(priceInput.value);

    // Перевірка введеної вартості
    if (isNaN(price) || price <= 0) {
        errorBox.textContent = "Введіть додатне число для вартості!";
        return;
    }
    errorBox.textContent = "";

    let text = fruit + " – " + price.toFixed(2) + " грн";

    // Якщо фрукт уже є у списку – оновлюємо його вартість
    let items = fruitList.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        if (items[i].dataset.fruit === fruit) {
            items[i].textContent = text;
            priceInput.value = "";
            return;
        }
    }

    // Інакше створюємо новий елемент списку
    let li = document.createElement("li");
    li.dataset.fruit = fruit;
    li.textContent = text;
    fruitList.appendChild(li);
    priceInput.value = "";
}

// Обробник події натискання клавіші в полі вартості
priceInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addFruit();
    }
});
