const express = require('express');
const helmet = require('helmet')

const server = express();

server.use(helmet())
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Smash Bros Site Api')
})

module.exports = server;