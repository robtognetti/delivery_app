const express = require('express');
const {
  salesCreateController,
  salesGetController,
  salesGetSellerController,
  getSaleByIdController,
} = require('../controllers/SaleController');

const salesRoute = express.Router();

salesRoute.post('/sales', salesCreateController);

salesRoute.post('/salesGet', (req, res) => salesGetController(req, res));
salesRoute.post('/salesGetSeller', (req, res) =>
  salesGetSellerController(req, res));
salesRoute.get('/orders/:id', (req, res) => getSaleByIdController(req, res));

module.exports = salesRoute;
