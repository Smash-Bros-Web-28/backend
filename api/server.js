const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Smash Bros Site Api')
})

module.exports = server;