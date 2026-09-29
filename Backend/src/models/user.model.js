import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username already exists'],
  },

  email: {
    type: String,
    required: true,
    unique: [true, 'Account already exists with this mail'],
  },

  password: {
    type: String,
    required: [true, 'Password is required']
  }

})

export const userModel = mongoose.model("Users", userSchema);