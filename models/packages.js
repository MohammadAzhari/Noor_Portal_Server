import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model('Package', packageSchema);

const packageServices = {
  async create(obj) {
    await Package.create(obj);
  },
  async find(name) {
    const filters = {};
    if (name) filters.name = { $regex: name, $options: 'i' };

    return await Package.find(filters)
      .populate('services')
      .populate({ path: 'createdBy', select: '-password' });
  },
};

export default packageServices;
