const { usersGetService, userGetService, userGetById } = require('../services/UsersService');

const NOT_FOUND = 'User or Password not found';

const usersController = async (_req, res) => {
        const user = await usersGetService();
        if (!user) return res.status(404).json({ message: NOT_FOUND });
        return res.status(200).json(user);
    };

    const userGet = async (req, res) => {
        const { email } = req.body;
        console.log(req);
        const user = await userGetService(email);
        if (!user) return res.status(404).json({ message: NOT_FOUND });
        return res.status(200).json(user);
    };

    const userGetId = async (req, res) => {
      const { id } = req.body;
        console.log(req);
        const user = await userGetById(id);
        if (!user) return res.status(404).json({ message: NOT_FOUND });
        return res.status(200).json(user);
    };

module.exports = { usersController, userGet, userGetId };
