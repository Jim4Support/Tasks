const employeeData = [
    {name: 'Taras Tarasov', birthday: '1989-07-28'},
    {name: 'Petro Petrov', birthday: '1985-08-22'},
    {name: 'Vasyl Vasylov', birthday: '1999-07-10'},
    {name: 'Vlad Vladov', birthday: '1991-06-02'},
    {name: 'Denis Denisov', birthday: '1987-08-08'},
    {name: 'Ignat Ignatov', birthday: '1984-09-17'},
    {name: 'Alex Alexov', birthday: '1994-09-11'},
    {name: 'Boris Borisov', birthday: '1995-12-30'},
    {name: 'Stas Stasov', birthday: '1998-10-08'},
]

function employeeBirthdays(employee, month) {
    const employeeArray = [...employee];
    let dayOfBirth;
    let age;
    let setMonth;
    const employeeMap = new Map();

    const setBirthdayInMap = () => {
        for (let i = 0; i <= month; i++) {
            const today = new Date();
            today.setMonth(today.getMonth(), 1);
            setMonth = new Date(today.setMonth(today.getMonth() + i)).toDateString().slice(4, 7) + ' ' + today.getFullYear();
            for (const element of employeeArray) {
                let ageInSeconds = today.getTime() - new Date(element.birthday).getTime();
                let ageConvertToDate = new Date(ageInSeconds);
                age = Math.abs(ageConvertToDate.getUTCFullYear() - 1970);
                dayOfBirth = parseInt(element.birthday.slice(8));
                if (employeeMap.has(setMonth) && setMonth.slice(0, 3).toString() === new Date(element.birthday).toDateString().slice(4, 7)) {
                    employeeMap.set(setMonth, employeeMap.get(setMonth).concat([{
                        day: dayOfBirth,
                        name: element.name,
                        age: age
                    }]));
                } else if (setMonth.slice(0, 3).toString() === new Date(element.birthday).toDateString().slice(4, 7)) {
                    employeeMap.set(setMonth, [{day: dayOfBirth, name: element.name, age: age}]);
                }
            }
        }
        return console.log(employeeMap);
    }
    setBirthdayInMap();
}

employeeBirthdays(employeeData, 1)