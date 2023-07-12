import express from 'express';
import mongoose from 'mongoose';
import { requireRole } from '../middlewares/usersRoles.js';
import customerServices from '../models/customers.js';
import { isValidId } from '../utils/connectDB.js';
import { server500Error } from '../utils/utilties.js';

const router = express.Router();

router.get('/', requireRole['any'], async (req, res) => {
  try {
    const dto = {
      name: req.query.name || '',
      phone: req.query.phone || '',
    };
    const customers = await customerServices.find(dto.name, dto.phone);
    res.status(200).json({ customers });
  } catch (error) {
    console.log(error);
    server500Error(res);
  }
});

router.post('/', requireRole['any'], async (req, res) => {
  try {
    const data = req.body;
    const customer = await customerServices.create(data);
    res.status(200).json({ customer });
  } catch (error) {
    console.log(error);
    server500Error(res);
  }
});

router.get('/:id', requireRole['any'], async (req, res) => {
  try {
    const { id } = req.params;
    let customer;
    if (isValidId(id)) {
      customer = await customerServices.getById(id);
    } else {
      customer = await customerServices.getByPhoneNumber(id);
    }
    if (!customer) {
      return res.sendStatus(404);
    }
    res.status(200).json({ customer });
  } catch (error) {
    server500Error(res);
  }
});

router.delete('/:id', requireRole['any'], async (req, res) => {
  try {
    const { id } = req.params;
    await customerServices.remove(id);
    res.sendStatus(204);
  } catch (error) {
    server500Error(res);
  }
});

export default router;
