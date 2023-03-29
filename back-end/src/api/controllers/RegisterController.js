const { registerService } = require('../services/RegisterService');

 const registerController = async (req, res) => {
        const user = await registerService(req, res);
        console.log(user);
        return res.status(201).json({ message: 'User has been created' });
    };

module.exports = { registerController };