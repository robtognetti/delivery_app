const { productsAllService } = require('../services/ProductsService');

 const productsAllController = async (req, res) => {
        const products = await productsAllService(req, res);
        if (!products) return res.status(404).json({ message: 'Couldnt get products' });
        return res.status(200).json(products);
    };

module.exports = { productsAllController };