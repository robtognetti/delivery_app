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

module.exports = { createSalesService, getUserSalesService };
