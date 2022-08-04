// sort by category | print all sum of price | print sum of price from every category
sortedPriceList([ // наш масив об'єктів
    {name: 'chicken', price: 32, category: 'meat'},
    {name: 'apple', price: 12, category: 'fruits'},
    {name: 'potato', price: 15, category: 'vegetables'},
    {name: 'pineapple', price: 22, category: 'fruits'},
    {name: 'onion', price: 7, category: 'vegetables'},
    {name: 'fish', price: 42, category: 'meat'},
]);

function sortedPriceList(array) {
    let checkList = new Map();
    // присвоюємо змінній копію оригінального масиву
    let sortedArray = [...array].sort((a, b) => a.name.localeCompare(b.name));
    // відразу обраховуємо масив для знаходження загальної суми
    let fullPrice = sortedArray
        .map(item => item.price)
        .reduce((a, b) => a + b);
    // створюємо цикл щоб засетить мапу
    for (let i = 0; i < sortedArray.length; i++) {
        if (checkList.has(sortedArray[i].category)) {
            checkList.set(sortedArray[i].category, checkList.get(sortedArray[i].category)
                .concat([{name: sortedArray[i].name, price: sortedArray[i].price}]))
        } else {
            checkList.set(sortedArray[i].category, [{name: sortedArray[i].name, price: sortedArray[i].price}]);
        }
    }
    // створили ще одну мапу для обрахунку суми з кожної категорії товару і сетимо новий об'єкт
    let checkListModified = new Map();
    for (const [category, items] of checkList) {
        let sum = 0;
        items.map(item => {
            sum += item.price
        })
        // для зручності виводу суми по категоріях конкатуємо тотал прайс в ключ
        checkListModified.set(category + `: total price = ${sum}`, checkList.get(category))
    }
    // виводимо нашу мапу
    checkListModified.forEach((value, key) => {
        console.log(key)
        value.forEach((val) => {
            console.log(val.name, val.price)
        })
    });
    console.log('\nfull price: ' + fullPrice); // консолимо загальну суму
}