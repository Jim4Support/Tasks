let text = 'раз два три чотири раз раз два два два два два два п`ять шість п`ять п`ять вісім одинадцять вісім';

function wordsCounter(text) {
    let obj = {};
    let txt = text.split(/\s+/);
    for (const words of txt) {
        obj[words] === undefined ? obj[words] = 1 : obj[words]++;
    }
    return (obj)
}

console.log(wordsCounter(text))