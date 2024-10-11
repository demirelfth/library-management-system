const { User } = require('../models');

exports.getUsers = async (req, res) => {

    try {
        const users = await User.findAll();
        if (!users) {
            return res.status(400).json({ message: 'No available users found' });
        }
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};