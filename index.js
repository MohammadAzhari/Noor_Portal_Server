import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.js';
import userRouter from './controllers/users.controller.js';
import customerRouter from './controllers/customers.controller.js';
import serviceRouter from './controllers/services.controller.js';
import settingsRouter from './controllers/settings.controller.js';
import packagesRouter from './controllers/packages.controller.js';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use('/users', userRouter);
app.use('/customers', customerRouter);
app.use('/services', serviceRouter);
app.use('/settings', settingsRouter);
app.use('/packages', packagesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('server is running ...');
});
