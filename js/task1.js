// Допоміжна функція: дата, що відрізняється від сьогоднішньої на n днів
function dateFromToday(n) {
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + n);
    return d;
}

// Масив об'єктів із задачами
// (дати задано відносно сьогоднішнього дня, щоб були присутні всі групи)
const tasks = [
    { name: "Зібрати вимоги",            description: "Опитати замовника та скласти список вимог",   start: dateFromToday(-8), duration: 2 },
    { name: "Розробити макет сторінки",  description: "Підготувати дизайн у Figma",                  start: dateFromToday(-5), duration: 4 },
    { name: "Написати JavaScript-код",   description: "Реалізувати логіку застосунку",               start: dateFromToday(-1), duration: 5 },
    { name: "Протестувати застосунок",   description: "Перевірити роботу у різних браузерах",        start: dateFromToday(0),  duration: 2 },
    { name: "Оформити документацію",     description: "Скласти опис та інструкцію користувача",      start: dateFromToday(3),  duration: 2 },
    { name: "Захист лабораторної роботи", description: "Підготувати презентацію та відповіді",       start: dateFromToday(7),  duration: 1 }
];

// Змінна для формування рядка виводу
let html = "";

// Функція розраховує кількість днів між сьогоднішньою датою та date
// Вхід: date – дата для порівняння; Вихід: кількість днів (може бути від'ємною)
function ras_Diff_Days(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((date - today) / (1000 * 60 * 60 * 24));
}

// Функція формує html-картку однієї задачі
// Вхід: item – поточна задача, i – її номер, array – масив задач
function vivod(item, i, array) {
    let end = new Date(item.start);
    end.setDate(end.getDate() + item.duration);      // дата завершення
    let toStart = ras_Diff_Days(item.start);         // днів до початку
    let toEnd = ras_Diff_Days(end);                  // днів до завершення

    let status, group;
    if (toStart > 0) {                               // ще не почалась
        group = "upcoming";
        status = "Розпочнеться через " + toStart + " дн.";
    } else if (toEnd > 0) {                          // виконується
        group = "in-progress";
        status = "До завершення " + toEnd + " дн.";
    } else {                                         // завершена
        group = "done";
        status = "Виконано";
    }

    let card = "<div class='card'>" +
        "<h4>" + (i + 1) + ". " + item.name + "</h4>" +
        "<p>" + item.description + "</p>" +
        "<p>Початок: " + item.start.toLocaleDateString("uk-UA") + "</p>" +
        "<p>Тривалість: " + item.duration + " дн.</p>" +
        "<p class='status'>" + status + "</p></div>";
    return { group: group, card: card };
}

// Головна функція: групує задачі та виводить планувальник
function ras() {
    let groups = { "done": "", "in-progress": "", "upcoming": "" };
    tasks.forEach(function (item, i, array) {
        let r = vivod(item, i, array);
        groups[r.group] += r.card;
    });

    function column(cls, title) {
        return "<div class='column " + cls + "'><h3>" + title + "</h3>" +
            (groups[cls] || "<p class='empty'>Задач немає</p>") + "</div>";
    }

    html = "<div class='planner'>" +
        column("done", "Виконані") +
        column("in-progress", "В процесі") +
        column("upcoming", "Повинні початися") +
        "</div>";
    document.getElementById("rezult").innerHTML = html;
}
