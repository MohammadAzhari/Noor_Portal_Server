import express from 'express';
import { requireRole } from '../middlewares/usersRoles.js';
import ServicesSectionsService from '../models/sections.js';
import serviceServices from '../models/services.js';
import { roles } from '../settings/roles.js';
import { server500Error } from '../utils/utilties.js';

const router = express.Router();

router.get('/', requireRole['any'], async (req, res) => {
  try {
    const dto = {
      name: req.query.name,
      section: req.query.section === 'all' ? '' : req.query.section,
      type: req.query.type === 'all' ? '' : req.query.type,
    };
    const services = await serviceServices.find(dto);
    res.status(200).json({ services });
  } catch (error) {
    server500Error(res);
  }
});

router.post('/', requireRole[roles.reception], async (req, res) => {
  try {
    const data = req.body;
    const service = await serviceServices.create(data);
    res.status(200).json({ service });
  } catch (error) {
    server500Error(res);
  }
});

router.delete('/:id', requireRole['any'], async (req, res) => {
  try {
    const { id } = req.params;
    await serviceServices.remove(id);
    res.sendStatus(204);
  } catch (error) {
    server500Error(res);
  }
});

router.get('/sections', requireRole['any'], async (req, res) => {
  try {
    const sections = await ServicesSectionsService.get();
    res.status(200).json({ sections });
  } catch (error) {
    server500Error(res);
  }
});

export default router;
