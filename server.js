const net = require('net');
const clients = [];
const messagesData = [];

const server = net.createServer(socket => {
    let nick = null;
    socket.write('Server connected:\r\n');
    messagesData.forEach(element => {
        socket.write(`${element.nick}: ${element.message}\n`);
    });
    socket.write('What is your name?: ');
    let clientInfo = `${socket.remoteAddress}`;
    console.log(`+ ${clientInfo} - connected`);
    socket.on('close', () => {
        let index = clients.indexOf((socket));
        clients.splice(index, 1);
        console.log(`- ${clientInfo} - closed`);
    });

    clients.push(socket);
    socket.on('data', message => {
        message = message.toString().replace('\n', '');
        if (nick === null) {
            nick = message;
        } else {
            messagesData.push({nick, message})
            clients.forEach(client => {
                if (client !== socket) {
                    client.write(`${nick}: ${message}\n`);
                }
            });
        }
    });
    socket.pipe(process.stdout);
});

server.listen(1337, '127.0.0.1');

server.on('listening', () => {
    console.log('Listening on ', server.address());
});