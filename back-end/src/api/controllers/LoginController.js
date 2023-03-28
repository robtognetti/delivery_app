const { loginService } = require('../services/LoginService');

 const loginController = async (req, res) => {
        const { email } = req.body;
        const user = await loginService(email);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    };

module.exports = { loginController };