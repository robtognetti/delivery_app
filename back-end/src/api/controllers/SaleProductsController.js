const { getSaleProductService,
     createSaleProductsService } = require('../services/SaleProductsService');

const getSaleProductsController = async (_req, res) => {
        const user = await getSaleProductService();
        if (!user) return res.status(404).json({ message: 'No sales' });
        return res.status(200).json(user);
    };

const createSaleProductsController = async (req, res) => {
        const saleProducts = await createSaleProductsService(req.body);
        if (!saleProducts) return res.status(400).json({ message: 'No sale' });
        return res.status(201).json(saleProducts);
    };

module.exports = { getSaleProductsController, createSaleProductsController };