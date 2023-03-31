const { usersGetService, userGetService } = require('../services/UsersService');

const usersController = async (_req, res) => {
        const user = await usersGetService();
        if (!user) return res.status(404).json({ message: 'User or Password not found' });
        return res.status(200).json(user);
    };

    const userGet = async (req, res) => {
        const { email } = req.body;
        console.log(req);
        const user = await userGetService(email);
        if (!user) return res.status(404).json({ message: 'User or Password not found' });
        return res.status(200).json(user);
    };

module.exports = { usersController, userGet };