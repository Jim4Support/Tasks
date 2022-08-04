let fs = require('fs');

let writeStream = fs.createWriteStream("file.txt");

const {Transform} = require('stream') // Створюємо константу класу Трансформ
const spyText = spyTextTransform(); // Змінна для функції трансформування

process.stdin.pipe(spyText).pipe(writeStream); // через пайпи передаємо нашу змінну з функцією

function spyTextTransform() {
    return new Transform({
        transform(chunk, encoding, callback) { // метод для чанка та колбеку
            let text = chunk.toString()
                .replaceAll('.', ' ')
                .split('')
                .map(text => text.charCodeAt(0)).join(' '); // if
            callback(null, text);
        }
    });
}
