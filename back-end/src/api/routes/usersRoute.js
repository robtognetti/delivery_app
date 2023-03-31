const express = require('express');
const { usersController, userGet, userGetId } = require('../controllers/UsersController');

const usersRoute = express.Router();

usersRoute.post('/users', (req, res) => userGet(req, res));
usersRoute.post('/usersId', (req, res) => userGetId(req, res));
usersRoute.get('/users/sellers', (req, res) => usersController(req, res));

module.exports = usersRoute;
