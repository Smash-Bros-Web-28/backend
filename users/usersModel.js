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
    return db('users').insert(creds, db('users').where(creds.username))
}

function findUserByName(username) {
    return db('users').where(username)
}

function removeUser(id) {
    return db('users').where({ id }).del()
}