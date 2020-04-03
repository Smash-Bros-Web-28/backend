const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./usersModel.js');

const router = express.Router();


module.exports = router