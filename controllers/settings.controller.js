import express from 'express';
import { requireRole } from '../middlewares/usersRoles.js';
import { roles } from '../settings/roles.js';
import { server500Error } from '../utils/utilties.js';
import ServicesSectionsService from '../models/sections.js';

const router = express.Router();

router.post('/sections', requireRole[roles.admin], async (req, res) => {
  try {
    const data = req.body;
    await ServicesSectionsService.create(data);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    server500Error(res);
  }
});

router.delete('/sections/:id', requireRole[roles.admin], async (req, res) => {
  try {
    const { id } = req.params;
    await ServicesSectionsService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    server500Error(res);
  }
});

export default router;
