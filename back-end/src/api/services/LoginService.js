const User = require('../../database/models/UserModel');

 const loginService = async (email) => {
        const user = await User.findOne({ where: { email } });
        if (!user) return null;
        return user;
    };
module.exports = { loginService };