let fs = require('fs');//
let data = process.argv[2];

let writeStream = fs.createWriteStream("file.txt");//

writeStream.write(data.toUpperCase().replaceAll('.', ' ').split('').map(text => text.
charCodeAt(0) - 64).join(' '), (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('data written')
    }
});
writeStream.end();

/*const {Transform} = require('stream')
const spyText = spyTextTransform();

process.stdin.pipe(spyText).pipe(writeStream);

function spyTextTransform() {
    return new Transform({
        transform(chunk, encoding, callback) {
            let text = textTransform(chunk.toString());
            callback(null, text);
        }
    });
    function textTransform(input) {
        return input.replaceAll('.', ' ').split('').map(text => text.
        charCodeAt(0) - 64).join(' ')
    }
}*/
