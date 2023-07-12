import mongoose from 'mongoose';
import mockData from '../mockdata.js';

export default function connectDB() {
  const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
  mongoose.connect(connectionString).then(() => {
    // mockData();
    console.log('connected to DB ...');
  });
}

export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
