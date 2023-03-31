const express = require('express');
const {
  salesCreateController,
  salesGetController,
  salesGetSellerController,
} = require('../controllers/SaleController');

const salesRoute = express.Router();

salesRoute.post('/sales', salesCreateController);

salesRoute.post('/salesGet', (req, res) => salesGetController(req, res));
salesRoute.post('/salesGetSeller', (req, res) =>
  salesGetSellerController(req, res));
module.exports = salesRoute;
