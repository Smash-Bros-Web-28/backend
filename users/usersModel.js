const db = require('../data/dbConfig.js')

module.exports = {
    findAllUsers,
    findUserByName,
    addUser,
    removeUser
}

function findAllUsers() {
    return db('users')
}

function addUser(creds) {
    return db('users').insert(creds, "id")
}

function findUserByName(gamerTag) {
    return db('users').where(gamerTag)
}

function removeUser(id) {
    return db('users').where({ id }).del()
}