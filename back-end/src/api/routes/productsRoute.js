const express = require('express');
const { productsAllController } = require('../controllers/ProductsController');

const productsRoute = express.Router();

productsRoute.get('/products', (req, res) => productsAllController(req, res));

module.exports = productsRoute;