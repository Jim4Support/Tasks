// sort by category | print all sum of price | print sum of price from every category
sortedPriceList([
    {name: 'chicken', price: 32, category: 'meat'},
    {name: 'apple', price: 12, category: 'fruits'},
    {name: 'potato', price: 15, category: 'vegetables'},
    {name: 'pineapple', price: 22, category: 'fruits'},
    {name: 'onion', price: 7, category: 'vegetables'},
    {name: 'fish', price: 42, category: 'meat'},
]);

function sortedPriceList(array) {
    let checkList = new Map();
    let sortedArray = [...array].sort((a, b) => a.name.localeCompare(b.name));

    let fullPrice = sortedArray
        .map(item => item.price)
        .reduce((a, b) => a + b);

    for (let i = 0; i < sortedArray.length; i++) {
        if (checkList.has(sortedArray[i].category)) {
            checkList.set(sortedArray[i].category, checkList.get(sortedArray[i].category)
                .concat([{name: sortedArray[i].name, price: sortedArray[i].price}]))
        } else {
            checkList.set(sortedArray[i].category, [{name: sortedArray[i].name, price: sortedArray[i].price}]);
        }
    }

    let checkListModified = new Map();
    for (const [category, items] of checkList) {
        let sum = 0;
        items.map(item => {
            sum += item.price
        })
        checkListModified.set(category, checkList.get(category).concat({total_price: sum}))
    }

    checkListModified.forEach((value, key) => console.log(key + '\n', ...value));
    return console.log('full price: ' + fullPrice);
}