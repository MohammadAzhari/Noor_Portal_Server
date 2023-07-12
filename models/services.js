import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['service', 'retail'], required: true },
    section: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

const serviceServices = {
  async create(obj) {
    return await Service.create(obj);
  },
  async find({ name, section, type }) {
    const filters = {};
    if (name) filters.name = { $regex: name, $options: 'i' };
    if (section) filters.section = section;
    if (type) filters.type = type;

    return await Service.find(filters);
  },
  async remove(id) {
    await Service.findByIdAndDelete(id);
  },
};

export default serviceServices;
