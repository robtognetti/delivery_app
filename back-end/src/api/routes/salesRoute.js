const express = require('express');
const { salesCreateController } = require('../controllers/SaleController');

const salesRoute = express.Router();

salesRoute.post(
  '/sales',
  salesCreateController,
);

module.exports = salesRoute;
