const fs = require('fs');
const path = require('path');

console.log(process.argv)
let topicsPath = process.argv[2] || [1]
let month = process.argv[3] || [1]

fs.readFile(topicsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let employee = data.replace(/(\r)/gm, "")
        .split('\n')
        .map(l => l.split(','))
        .map(([birthday, name]) => ({birthday, name}))
    employeeBirthdays(employee,month)
});

function employeeBirthdays(employee, month) {
    const employeeArray = [...employee].sort((a, b) => new Date(b.birthday) - new Date(a.birthday));
    const employeeMap = new Map();
    let dayOfBirth;
    let age;
    let setMonth;

    const setBirthdayInMap = () => {
        for (let i = 0; i <= month; i++) {
            const today = new Date();

            today.setMonth(today.getMonth(), 1);
            setMonth = new Date(today.setMonth(today.getMonth() + i)).toDateString().slice(4, 7) + ' ' +
                today.getFullYear();
            for (const element of employeeArray) {
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
        employeeMap.forEach((v, k) => {
            console.log(k)
            v.forEach((val) => {
                console.log(`(${val.birthday}) - ${val.name} (${val.age})`)
            })
        })
    }
    setBirthdayInMap();
}

