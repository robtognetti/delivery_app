const express = require('express');
const { usersController } = require('../controllers/UsersController');

const usersRoute = express.Router();

usersRoute.get('/users/sellers', (req, res) => usersController(req, res));

module.exports = usersRoute;