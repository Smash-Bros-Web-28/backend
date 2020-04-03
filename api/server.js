const express = require('express');
const helmet = require('helmet')


const usersRouter = require('../users/usersRouter.js')

const server = express();

server.use(helmet())
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Smash Bros Site Api')
})

server.use('/api/users', usersRouter)

module.exports = server;