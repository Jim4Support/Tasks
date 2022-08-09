const { Client } = require('pg')
const client = new Client({
    user: 'support',
    host: '127.0.0.1',
    database: 'list',
    password: 'support',
    port: 5432,
});

client.connect();

module.exports = client;
