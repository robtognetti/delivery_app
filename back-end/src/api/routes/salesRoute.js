const express = require('express');
const { salesCreateController, salesGetController } = require('../controllers/SaleController');

const salesRoute = express.Router();

salesRoute.post(
  '/sales',
  salesCreateController,
);

salesRoute.post('/salesGet', (req, res) => salesGetController(req, res));
module.exports = salesRoute;
