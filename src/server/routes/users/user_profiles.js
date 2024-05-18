const User = require('../../models/User');

module.exports = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
}

// Path: server/routes/users/user_profiles.js

