const { Product } = require('../../database/models/index');

 const productsAllService = async (_req, _res) => {
    const allProducts = await Product.findAll();
    console.log(allProducts);
    return allProducts;
};
module.exports = { productsAllService };
