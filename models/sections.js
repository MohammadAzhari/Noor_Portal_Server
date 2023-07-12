import { Schema, model } from 'mongoose';

const servicesSectionsSchema = new Schema({
  name: { type: String, required: true },
});

const ServicesSections = model('ServicesSections', servicesSectionsSchema);

const ServicesSectionsService = {
  async create(obj) {
    return await ServicesSections.create(obj);
  },
  async remove(id) {
    return await ServicesSections.findByIdAndDelete(id);
  },
  async get() {
    return await ServicesSections.find();
  },
};

export default ServicesSectionsService;
