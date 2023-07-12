import express from 'express';
import { requireRole } from '../middlewares/usersRoles.js';
import packageServices from '../models/packages.js';
import { roles } from '../settings/roles.js';
import { server500Error } from '../utils/utilties.js';

const router = express.Router();

router.get('/', requireRole['any'], async (req, res) => {
  try {
    const name = req.query.name;

    const packages = await packageServices.find(name);
    res.status(200).json({ packages });
  } catch (error) {
    server500Error(res);
  }
});

router.post('/', requireRole['any'], async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.user._id,
    };
    await packageServices.create(data);
    res.sendStatus(201);
  } catch (error) {
    server500Error(res);
  }
});

export default router;
