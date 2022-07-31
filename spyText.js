let fs = require('fs');
let data = process.argv[2];

let writeStream = fs.createWriteStream("file.txt");
writeStream.write(data.toUpperCase().replaceAll('.', ' ').split('').map(text => text.
charCodeAt(0) - 64).join(' '), (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('data written')
    }
});
writeStream.end();

/*
const {Transform} = require('stream')

class spyText extends Transform {
    constructor(letter) {
        super();
        this.spyLetter = letter;
    }
    _transform(chunk, encoding, callback) {
        let chTransform = chunk.toString().replace(/[a-z][A-Z][/d]/g, this.spyLetter);
        this.push(chTransform);
        callback();
    }
    _flush(callback) {
        this.push('....')
        callback();
    }
}
let stream = new spyText('x');
process.stdin.pipe(stream).pipe(process.stdout);*/
