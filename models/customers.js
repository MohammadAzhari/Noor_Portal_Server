import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    packages: [
      {
        package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
        services: [
          {
            service: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Service',
            },
            status: {
              type: String,
              enum: ['pending', 'done'],
              default: 'pending',
            },
          },
        ],
        status: {
          type: String,
          enum: ['pending', 'done'],
          default: 'pending',
        },
      },
    ],
    name: { type: String, required: true },
    address: { type: String },
    discount: { type: Number, default: 0 },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

const customerServices = {
  async create(obj) {
    return await Customer.create(obj);
  },
  async find(name, phone) {
    const filters = {};
    if (name) filters.name = { $regex: name, $options: 'i' };
    if (phone) filters.phone = { $regex: phone, $options: 'i' };

    return await Customer.find(filters);
  },
  async remove(id) {
    await Customer.findByIdAndDelete(id);
  },
  async getById(id) {
    return await Customer.findById(id);
  },
  async getByPhoneNumber(phone) {
    return await Customer.findOne({ phone });
  },
};

export default customerServices;
