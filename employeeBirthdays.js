const fs = require('fs'); // створили fs модуль
const path = require('path'); // шлях

let employees = process.argv[2] || [1]
let month = process.argv[3] || [1]
// зчитуємо файл (шлях до файлу вказуємо через консоль першим значенням після назви файлу)
fs.readFile(employees, { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.error(err.message);
        return;
    }
    let employee = data.replace(/(\r)/gm, "")
        .split('\n')
        .map(l => l.split(','))
        .map(([birthday, name]) => ({birthday, name}))
    employeeBirthdays(employee,month)
});
// Створюємо функцію з двома вхідними параметрами - дані співробітника та горизонт планування відповідно
function employeeBirthdays(employee, month) {
    // Створюємо копію оригінального масиву та сортуємо по дню народження
    const employeeArray = [...employee].sort((a, b) => new Date(b.birthday) - new Date(a.birthday));
    const employeeMap = new Map();
    // Створюємо змінні для подальшого їх використання
    let dayOfBirth;
    let age;
    let setMonth;

    // Створюємо цикл для другого параметру функції
    const setBirthdayInMap = () => {
        for (let i = 0; i <= month; i++) {
            const today = new Date(); // створили константу з поточною датою
            // Потрібна саме тут, щоб оновлювати поточну дату в циклі,
            // інакше в змінній setMonth буде некоректно показувати наступні місяці в плануванні

            today.setMonth(today.getMonth(), 1);
            setMonth = new Date(today.setMonth(today.getMonth() + i)).toDateString().slice(4, 7) + ' ' +
                today.getFullYear();
            for (const element of employeeArray) { // цикл для обрахунку віку та дню народження,
                // а також щоб сетить в нашу мапу дані з масиву
                let ageInSeconds = today.getTime() - new Date(element.birthday).getTime();
                let ageConvertToDate = new Date(ageInSeconds);

                age = Math.abs(ageConvertToDate.getUTCFullYear() - 1970);
                dayOfBirth = parseInt(element.birthday.slice(8));
                if (employeeMap.has(setMonth) && setMonth.slice(0, 3).toString()
                    === new Date(element.birthday).toDateString().slice(4, 7)) {
                    employeeMap.set(setMonth, employeeMap.get(setMonth).concat([{
                        birthday: dayOfBirth,
                        name: element.name,
                        age: age
                    }]));
                } else if (setMonth.slice(0, 3).toString() === new Date(element.birthday).toDateString().slice(4, 7)) {
                    employeeMap.set(setMonth, [{
                        birthday: dayOfBirth,
                        name: element.name,
                        age: age
                    }]);
                }
            }
        }
        // Виводимо нашу мапу
        employeeMap.forEach((v, k) => {
            console.log(k)
            v.forEach((val) => {
                console.log(`(${val.birthday}) - ${val.name} (${val.age})`)
            })
        })
    }
    setBirthdayInMap();
}