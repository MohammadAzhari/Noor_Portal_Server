import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { roles } from '../settings/roles.js';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.keys(roles),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

const userServices = {
  async create({ username, password, email, role }) {
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
  },
  async findByEmail(email) {
    return await User.findOne({ email });
  },
  async getById(id) {
    return await User.findById(id);
  },
  async find({ username, email }) {
    const filters = {};
    if (username) filters.username = { $regex: username, $options: 'i' };
    if (email) filters.email = { $regex: email, $options: 'i' };

    return await User.find(filters);
  },
};

export default userServices;
