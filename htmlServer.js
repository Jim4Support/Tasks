function wordsCounter(text) { //функція обрахунку слів, виявлення к-сті унікальних та найбільш часто зустрічалось
    let obj = {};
    let txt = text.toLowerCase().replace('.', '').split(/\s+/);
    for (const words of txt) {
        obj[words] === undefined ? obj[words] = 1 : obj[words]++;
    }
    let textFrequency = Object.entries(obj).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr)[0];
    let textUnique = Object.values(obj).length;
    return `${JSON.stringify(obj)}\nThe most frequent word: ${textFrequency}\nUnique words: ${textUnique}`;
}

function plural(count, one, few, many) { //функція плюралізації слів
    if(count%10 === 1 && count%100 !== 11){
        return((count + " " + one + '\n'));
    } else if(count === 0 || count <= 20 && count >= 5 || count%10 === 0 || count%10 <= 19 && count%10 >= 5 || count%100 == 20){
        return((count + " " + many + '\n'));
    } else {
        return((count + " " + few + '\n'));
    }
}
const http = require('http');
const server = http.createServer((req, res) => { // створюємо серв
    if(req.url === '/headers') {
        const arr = [{subject: 'box'}, {subject: 'table'}, {subject: 'cat'}, {subject: 'catInBox?'}];
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(arr));
    } else if (req.url.includes('/plural')) {
        let numSlice = req.url.slice(req.url.indexOf('?'), req.url.indexOf('&'));
        let number = parseInt(numSlice.slice(8));
        let formSlice = req.url.slice(req.url.indexOf('&'));
        let forms = formSlice.slice(7).split(',');
        res.writeHead(201, {'Content-Type' : 'application/json'});
        res.end(plural(number, forms[0], forms[1], forms[2]));
    } else if (req.url.includes('/frequency')){
        if (req.method === 'POST') {
            const data = [];
            req.on('data', chunk => data.push(chunk));
            req.on('end', () => {
                const freq = wordsCounter(data.toString());
                res.writeHead(202, {'Content-Type': 'application/json'});
                res.end(freq);
            });
        } else {
            res.writeHead(404, 'Not found');
            res.end();
        }
    } else {
        res.writeHead(404, 'Not found');
        res.end();
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server localhost: ${port}`);
});