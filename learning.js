// 1. Функція обрахунку суми
/*let sumIntCounter = (a,b) => {return parseInt(a+b)}
console.log('Sum of integers:' + sumIntCounter(12.5,20.2));
// 2. Функція обрахунку факторіалу
let factorialCounter = f => {
    return (f != 1) ? f * factorialCounter(f - 1) : 1;
}
console.log('Factorial: ' + factorialCounter(4));
// Task #1.1
function isAdult(age) {
    return (age<=17) ? 'ERROR : true;
}
console.log(isAdult(18));
*/
// Task #1.2
/*
function plural(count, one, few, many) {
    let form = '';
    if(count%10===1 && count%100!==11){
        return (count+" "+one);
    } else if(count===0 || count<=20 && count>=5 || count%10===0 || count%10<=19 && count%10>=5 || count%100==20){
        return (count+" "+many);
    } else {
        return (count+" "+few);
    }
    //return count + ' ' + form;
}
console.log(plural(38, 'задача', 'задачі', 'задач'))
*/
// Task #2.1
/*
function renderTextInFrame(text) {
    let result = '';
    let star = '*';
    let space = '   ';
    result+=star.repeat(text.length+8)+'\n';
    result+=star+' '.repeat(text.length+6)+star+'\n';
    result+=star + space+text + space + star + '\n';
    result+=star+' '.repeat(text.length+6)+star+'\n';
    result+=star.repeat(text.length+8)+'\n';
    return result;
}

console.log(renderTextInFrame('Hello World!'));
*/
// Task #2.2
/*
function positionInAlphabet(letter) {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    letter = letter.toUpperCase();
    if(str.includes(letter)){
        return letter.charCodeAt() - 64;
    } 
    return 0;
    
}
console.log(positionInAlphabet('z'))
*/
// Task #3.1
/*
function sumInRange(start, end) {
    let exp = 0;
    if (end-start<1 && end-start>=0) {
        return start+end;
    } else {
        for (let i = start; i < end; i++) {
            exp += start++;
        }
        return exp+end;
    }
    
 }
console.log(sumInRange(1,5))
*/
// Task #3.2
/*
function printAlphabet() {
    let exp = '';
    let i = 1;
    for (let index = 65; index < 91; index++) {
        exp += String.fromCharCode(index) + ' ' + i + '\n';
        i++;
    }
    console.log(exp.slice(0, exp.length-1));
}
printAlphabet();
*/
// Task #4
/*
function printAlphabet(cols) {
    let exp = '';
    let letters = Math.ceil(26 / cols);
    for (let i = 65; i < 65 + letters; i++) {
        for (let j = i; j < 91; j+=letters) {
            if (i===j) {
                exp += String.fromCharCode(j);
            } else {
            exp += '\t' + String.fromCharCode(j);
            }
        }
    exp += '\n';
    }
    console.log(exp.slice(0, exp.length - 1));
}
printAlphabet(2);
*/
// Task #5.1
/*
function sum(items) {
    let result;
    if (items.length === 0) {
        return 0;
    }
    result = items.reduce((a, b) => {return a + b});
    return result;
}
console.log(sum([22,33,44]));
*/
// Task #5.2
/*
function difference(a, b) {
    let resArr = [];
    let exp = [];
    let j = 0;
    for (let i = 0; i <= a.length; i++) {
        if (a[i]!==b[j] && a.length >= b.length) {
        exp.push(a[i]);
        }
        j++;
    }
    return exp;
}
console.log(difference([1,2,3], [1,4,3]));
*/

// Test #5.3
/*
function capitalizeText(text) {
    return text.split(/\s+/).map(text => text[0].toUpperCase() + text.substring(1)).join(' ');
}
console.log(capitalizeText('i can\'t wait to be king'));
*/

// Test #5.4
/*
function isValidParentheses(expression) {
    let resArr = [];
    let res = [];
    for (let i = 0; i < expression.length; i++) {
        let exp = expression[i];
        if (exp === '(') {
            resArr.push(exp);
        }
        if (exp === ')') {
            res.push('(');
        }
    }
    res.reverse();
    if (res.length < resArr.length || res.length > resArr.length) {
        return false;
    }
    for (let i = 0; i < resArr.length; i++) {
        if (resArr[i] !== res[i]) {
            return false;
        }
    }
    return true;
}

console.log(isValidParentheses('()(') ? 'OK' : 'ERROR')
console.log(isValidParentheses('(())') ? 'OK' : 'ERROR')
console.log(isValidParentheses('a + b') ? 'OK' : 'ERROR')
console.log(isValidParentheses('c / ((a + b) * 2)') ? 'OK' : 'ERROR')
console.log(isValidParentheses('((a + b) * (a + b)') ? 'OK' : 'ERROR')
console.log(isValidParentheses('a + b) * (a + b)') ? 'OK' : 'ERROR')*/

/*
Correct test
function isValidParentheses(expression) {
    let parentheses = [];
    for (let c of expression.split('')) {
        if (c === '(') {
            parentheses.push(c);
        } else if (c === ')') {
            if (parentheses.length !== 0) {
                parentheses.pop();
            } else {
                return false;
            }
        }
    }
    return parentheses.length === 0;
}

console.log(isValidParentheses('()(') ? 'OK' : 'ERROR')
console.log(isValidParentheses('(())') ? 'OK' : 'ERROR')
console.log(isValidParentheses('a + b') ? 'OK' : 'ERROR')
console.log(isValidParentheses('c / ((a + b) * 2)') ? 'OK' : 'ERROR')
console.log(isValidParentheses('((a + b) * (a + b)') ? 'OK' : 'ERROR')
console.log(isValidParentheses('a + b) * (a + b)') ? 'OK' : 'ERROR')*/

// Test #6
/*
function textToAlphabetPos(text) {
    let result = '';
    result = text.split('').map(text => text.charCodeAt() - 96);
    for (let i = 0; i < result.length; i++) {
        if(result[i] < 0) {
            result.splice(i, 1, ' ')
        }
    }
    return result.join(' ');
}
console.log(textToAlphabetPos('abc  defg xyz'));*/

// Test #7.1
/*
function renderField(field) {
    let output = '';
    for (let i = 0; i < 3; i+=3) {
        for (let j = i; j < field.length; j++) {
            if (field [j] === 1) {
                field [j] = 'x';
                if (field[1] === 'x'){
                    field[1] = '| x |'
                } if (field[4] === 'x'){
                    field[4] = '| x |'
                } if (field[7] === 'x'){
                    field[7] = '| x |'
                }
            } if (field [j] === 0) {
                field [j] = ' ';
                if (field[1] === ' '){
                    field[1] = '|   |'
                } if (field[4] === ' '){
                    field[4] = '|   |'
                } if (field[7] === ' '){
                    field[7] = '|   |'
                }
            } if (field [j] === -1) {
                field [j] = '0';
                if (field[1] === '0'){
                    field[1] = '| 0 |'
                } if (field[4] === '0'){
                    field[4] = '| 0 |'
                } if (field[7] === '0'){
                    field[7] = '| 0 |'
                }
            }
            output += ' ' + field[j];
            if (j===2) {
              output += '\n'; 
              output += '---+---+---\n' 
            } else if (j===5) {
              output += '\n';
              output += '---+---+---\n'
            }
        }
    }
    return output;
}
console.log(renderField([
    0, 0, 0, 
    0, 0, 0, 
    0, 0, 0, 
   ]));
console.log(renderField([
    1, -1, 1, 
    0, 1, -1, 
    0, 0, -1,
   ]));
*/

// Test #7.2
/*
function gameStatus(field) {
    let arrX = [
        [x1 = (field[0]===1 && field[1]===1 && field[2]===1) ? 'x' : false],
        [x2 = (field[3]===1 && field[4]===1 && field[5]===1) ? 'x' : false],
        [x3 = (field[6]===1 && field[7]===1 && field[8]===1) ? 'x' : false],
        [x4 = (field[0]===1 && field[3]===1 && field[6]===1) ? 'x' : false],
        [x5 = (field[1]===1 && field[4]===1 && field[7]===1) ? 'x' : false],
        [x6 = (field[2]===1 && field[5]===1 && field[8]===1) ? 'x' : false],
        [x7 = (field[0]===1 && field[4]===1 && field[8]===1) ? 'x' : false],
        [x8 = (field[2]===1 && field[4]===1 && field[6]===1) ? 'x' : false],
        [a0 = (field[0]===-1 && field[1]===-1 && field[2]===-1) ? '0' : false],
        [b0 = (field[3]===-1 && field[4]===-1 && field[5]===-1) ? '0' : false],
        [c0 = (field[6]===-1 && field[7]===-1 && field[8]===-1) ? '0' : false],
        [d0 = (field[0]===-1 && field[3]===-1 && field[6]===-1) ? '0' : false],
        [e0 = (field[1]===-1 && field[4]===-1 && field[7]===-1) ? '0' : false],
        [f0 = (field[2]===-1 && field[5]===-1 && field[8]===-1) ? '0' : false],
        [g0 = (field[0]===-1 && field[4]===-1 && field[8]===-1) ? '0' : false],
        [h0 = (field[2]===-1 && field[4]===-1 && field[6]===-1) ? '0' : false],
    ];
      let checkX = x1 ? x1 : x2 ? x2 : x3 ? x3 : x4 ? x4 : x5 ? x5 : x6 ? x6 : x7 ? x7 : x8 ? x8 : false;
      let check0 = a0 ? a0 : b0 ? b0 : c0 ? c0 : d0 ? d0 : e0 ? e0 : f0 ? f0 : g0 ? g0 : h0 ? h0 : false;
      let end = false;
      let turn = false;
      for (let i = 0; i < field.length; i++) {
        if (field[i] !== 0 && checkX === false && check0 === false) {
            end = 'end';
        }
        if (field[i] === 0 && checkX === false && check0 === false) {
            turn = 'turn';
        }
    }
    return checkX ? checkX : check0 ? check0 : turn ? turn : end ? end : false;
}
   console.log(gameStatus([
    0, 0, 0, 
    0, 0, 0, 
    0, 0, 0, 
   ]))
   console.log(gameStatus([
    1, -1, 1, 
    -1, 1, -1, 
    -1, 1, -1, 
   ]))
   console.log(gameStatus([
    1, 0, -1, 
    0, 1, -1, 
    0, 0, 1, 
   ]))
   console.log(gameStatus([
    1, 1, -1, 
    -1, -1, -1, 
    1, 1, 0, 
   ]))
   */
// Test #7.3
/*
function makeTurn(field, player, index) {
    if(field[index]===0){
        field[index] = player;
        return true;
    } else
    return false;
}
field = new Array(9).fill(0);
console.log(makeTurn(field, -1, 2))
*/

// Task #8.1
/*
function printTask(index, task) {
    let date;
    let done = task.done === true ? '[x]' : '[ ]';
    let output = `${index}. ${done}`;
    (task.title!==undefined) ? output += ' ' + task.title : '';
    if (task.dueDate!==undefined) {
        date = task.dueDate.toDateString().slice(4,10);
        output += ' (' + date + ')';
    }
    (task.desc!==undefined) ? output += '\n' + '   ' + task.desc : '';
    console.log(output); 
}

// function printTask(index, task) {
//     let output = `${index}. `;
//     let done = task.done === false ? '[ ] ' : '[x] ';
//     let title = task.title;
//     let desc = task.desc ? '\n' + ' '.repeat(output.length) + task.desc : '';
//     let date = task.dueDate ? ` (${task.dueDate.toDateString().slice(4,10)})` : '';
//     return `${output}${done}${title}${desc}${date}`; 
// }

console.log(printTask(1, {done: false, title: 'Undone task'}));
console.log(printTask(2, {done: true, title: 'Done task'}));
console.log(printTask(3, {done: false, title: 'Objects', desc: 'Learn more about this'}));
console.log(printTask(4, {done: false, title: 'Complete first course task', dueDate: new Date('2022-01-17')}));
*/

// Task #8.2
/*
class Task {
    constructor(attributes) {
        Object.assign(this, attributes);
    }

    toString() {
        this.done = this.done === true ? '[x] ' : '[ ] ';
        this.title = this.title;
        this.desc = this.desc ? '\n' + ' '.repeat(output.length) + task.desc : '';
        this.date = this.dueDate ? ` ${task.dueDate.toDateString()})` : '';
        return `${this.id}. ${this.done}${this.title}${this.desc}${this.date}`; 
}
    toggle(){
        return this.done===true ? this.done = false : this.done = true;
    }

    isOverdue() {
        const date = new Date();
        if (this.dueDate < date) {
            return true;
        }
        return false
    }

    postpone(timeSpan) {
        this.dueDate.setDate(this.dueDate.getDate() + timeSpan.days);
    }
}
*/

/*
let text = 'раз два три чотири раз раз два два два два два два п`ять шість п`ять п`ять вісім одинадцять вісім';

function wordsCounter(text) {
    let obj = {};
    let txt = text.split(/\s+/);
    for (const words of txt) {
        obj[words]===undefined ? obj[words] = 1 : obj[words]++;
    }
    return(obj)
}
console.log(wordsCounter(text))
*/

// sort by category | print all sum of price | print sum of price every category
/*function sortedPriceList(array) {
    let checkList = new Map();
    let arr = [...array];

    let total = arr
        .map(item => item.price)
        .reduce((a, b) => a + b);


    for (let i = 0; i < arr.length; i++) {
        if (checkList.has(arr[i].category)) {
            checkList
                .set(arr[i].category, checkList.get(arr[i].category)
                    .concat([{name: arr[i].name, price: arr[i].price}]))
        } else {
            checkList.set(arr[i].category, [{name: arr[i].name, price: arr[i].price}]);
        }
    }

    for (const [first, second] of checkList.values()) {
        let sum = first.price + second.price;
        //checkList.set('full: ', sum)
        console.log(sum)
        }

    console.log(checkList);
    return ('\n total price: ' + total);
}


console.log(sortedPriceList([
    {name: 'chicken', price: 32, category: 'meat'},
    {name: 'apple', price: 12, category: 'fruits'},
    {name: 'potato', price: 15, category: 'vegetables'},
    {name: 'pineapple', price: 22, category: 'fruits'},
    {name: 'onion', price: 7, category: 'vegetables'},
    {name: 'fish', price: 42, category: 'meat'},
]));*/


function employeeBirthdays(employee, month) {
    let employeeMap = [...employee];
    let map = new Map();
    let today = new Date();
    let dayOfBirth;
    let age;
    let setMonth = new Date(today.setMonth(today.getMonth() + month)).toDateString().slice(4, 7) + ' ' + today.getFullYear();
    console.log(setMonth)
    const setBirthdayInMap = () => {
        for (const element of employeeMap) {
            let ageInSeconds = today.getTime() - new Date(element.birthday).getTime();
            let ageConvertToDate = new Date(ageInSeconds);
            age = Math.abs(ageConvertToDate.getUTCFullYear() - 1970);
            dayOfBirth = element.birthday.slice(8);
            if (map.has(setMonth) && setMonth.slice(0, 3).toString() === new Date(element.birthday).toDateString().slice(4, 7)) {
                map.set(setMonth, map.get(setMonth).concat([{day: dayOfBirth, name: element.name, age: age}]));
            } else if (setMonth.slice(0, 3).toString() === new Date(element.birthday).toDateString().slice(4, 7)) {
                map.set(setMonth, [{day: dayOfBirth, name: element.name, age: age}]);
            }
        }
        return console.log(map);
    }
    setBirthdayInMap();
}

const employeeData = [
    {name: 'Taras Tarasov', birthday: '1989-07-28'},
    {name: 'Petro Petrov', birthday: '1985-08-22'},
    {name: 'Vasyl Vasylov', birthday: '1999-07-10'},
    {name: 'Vlad Vladov', birthday: '1991-06-02'},
    {name: 'Alex Alexov', birthday: '1994-09-15'},
    {name: 'Boris Borisov', birthday: '1995-01-30'},
    {name: 'Stas Stasov', birthday: '1998-10-08'},
]
console.log(employeeBirthdays(employeeData, 0))
