const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./usersModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    users.findAllUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Failed to get users' })
        })
})

router.post('/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash
    if(creds.email && creds.gamerTag && creds.password){
        users.addUser(creds)
            .then(newUser => {
                const token = generateToken(newUser.id)
                res.status(201).json({ token })
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'Failed to add user'})
            })
    } else {
        res.status(400).json({ errorMessage: 'All fields are required' })
    }
})

router.post('/login', (req, res) => {
    let {gamerTag, password} = req.body;

    users.findUserByName({gamerTag})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user.id)

                res.status(200).json({gamerTag: `${user.gamerTag}`, token, id: user.id });                
            } else {
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    
    users.removeUser(id)
        .then(delUser =>{
            res.status(200).json(delUser)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not delete user'})
        })
})

function generateToken(id){
    const payload = {
        subject: id,
    };
    const secret = 'Secret sauce';
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router