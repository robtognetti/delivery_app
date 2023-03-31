const { Sale } = require('../../database/models/index');

 const createSalesService = async (req, _res) => {
    try {
        const newSale = await Sale.create({ ...req.body });
        await newSale.save();
        return newSale;
    } catch (err) {
        console.log(err);
    }
 };
    const getUserSalesService = async (req) => {
        const { userId } = req.body;
        const sales = await Sale.findAll({ where: { userId } });
        return sales;
    };

    const getUserSalesSellerService = async (req) => {
        const { sellerId } = req.body;
        const salesSeller = await Sale.findAll({ where: { sellerId } });
        return salesSeller;
    };

module.exports = { createSalesService, getUserSalesService, getUserSalesSellerService };
