const { usersGetService } = require('../services/UsersService');

 const usersController = async (_req, res) => {
        const user = await usersGetService();
        if (!user) return res.status(404).json({ message: 'User or Password not found' });
        return res.status(200).json(user);
    };

module.exports = { usersController };