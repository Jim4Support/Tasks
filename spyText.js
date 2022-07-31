let fs = require('fs');
let data = process.argv[2];
console.log(process.argv)

let writeStream = fs.createWriteStream("file.txt");
writeStream.write(data.split('').map(text => text.charCodeAt(0) - 64).join(' '), (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('data written')
    }
});
writeStream.end();

