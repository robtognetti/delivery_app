const express = require('express');
const { usersController, userGet } = require('../controllers/UsersController');

const usersRoute = express.Router();

usersRoute.post('/users', (req, res) => userGet(req, res));
usersRoute.get('/users/sellers', (req, res) => usersController(req, res));

module.exports = usersRoute;