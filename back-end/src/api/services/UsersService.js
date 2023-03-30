const { User } = require('../../database/models');

 const usersGetService = async () => {
    const allProducts = await User.findAll({ where: { role: 'seller' } });
    console.log(allProducts);
    return allProducts;
};
module.exports = { usersGetService };
