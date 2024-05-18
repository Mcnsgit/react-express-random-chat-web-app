const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePictureURL: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  country: { type: String, required: false },
  isOnline: { type: Boolean, default: false },
  // Assuming interests are stored as an array of strings
  interests: [String],
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hashedPassword) => {
      if (err) return next(err);

      this.password = hashedPassword;
      next();
    });
  });
});

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;