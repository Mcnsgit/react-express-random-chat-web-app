const User = require('../models/User');

exports.findMatchForUser = async (req, res) => {
  const userId = req.user._id; // Assuming you have middleware to authenticate and populate req.user
  const currentUser = await User.findById(userId);
  
  let query = {
    isOnline: true,
    _id: { $ne: userId } // Exclude current user
  };
  
  if (currentUser.interests.length > 0) {
    query.interests = { $in: currentUser.interests };
  }

  if (currentUser.country) {
    query.country = currentUser.country;
  }

  let potentialMatches = await User.find(query);

  if (potentialMatches.length === 0) {
    // Fallback to random online user match
    potentialMatches = await User.find({ isOnline: true, _id: { $ne: userId } });
  }

  const match = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];

  return res.json(match); // Send matched user's data
};
