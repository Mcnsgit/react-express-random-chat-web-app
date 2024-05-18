const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });
    res.json(user);
  }
  catch (error) {
    res.status(500).send("Server error");
    console.log(error);
    return
  }
  // Implementation for updating user profile
};
