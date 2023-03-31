const { createSalesService, getUserSalesService } = require('../services/SalesService');

 const salesCreateController = async (req, res) => {
    console.log(req.headers);
        const sale = await createSalesService(req, res);
        return res.status(201).json({ sale });
    };
const salesGetController = async (req, res) => {
    console.log(req);
    const sales = await getUserSalesService(req);
    return res.status(200).json({ sales });
};

module.exports = { salesCreateController, salesGetController };