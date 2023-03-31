const { User } = require('../../database/models');

const usersGetService = async () => {
    const allProducts = await User.findAll({ where: { role: 'seller' } });
    console.log(allProducts);
    return allProducts;
};

const userGetService = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
};
module.exports = { usersGetService, userGetService };
