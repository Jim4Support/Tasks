const net = require('net');
const clients = [];
let nick = null;




const server = net.createServer(socket => {
    socket.write('Server connected:\r\n');

    let clientInfo = `${socket.remoteAddress}`;
    console.log(`+ ${clientInfo} - connected`);


    socket.on('close', () => {
        let index = clients.indexOf((socket));
        clients.splice(index, 1);
        console.log(`- ${clientInfo} - closed`)
    });
clients.push(socket)
    socket.on('data', message => {
        clients.forEach(client => {
            if (nick === null) {
                client.write(message);
                nick = message;
            } else {
                client.write(`${clients['nick']} `, message);
                clients.push(nick,message);
                console.log(clients);
            }
        })
    })
    socket.pipe(process.stdout);
});

server.listen(1337, '127.0.0.1');

server.on('listening', () => {
    console.log('Listening on ', server.address());
});
