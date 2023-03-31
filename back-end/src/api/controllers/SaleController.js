const { createSalesService } = require('../services/SalesService');

 const salesCreateController = async (req, res) => {
    console.log(req.headers);
        const sale = await createSalesService(req, res);
        return res.status(201).json({ sale });
    };

module.exports = { salesCreateController };