import express from 'express';
import userServices from '../models/users.js';
import { signJWT } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';
import { requireRole } from '../middlewares/usersRoles.js';
import { roles } from '../settings/roles.js';
import { server500Error } from '../utils/utilties.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.findByEmail(email);
    if (!user) {
      return res.status(400).send('Wrong username or password');
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).send('Wrong username or password');
    }
    const token = signJWT(user.toJSON());
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    server500Error(res);
  }
});

router.post('/signup', requireRole[roles.admin], async (req, res) => {
  try {
    const data = req.body;
    await userServices.create(data);
    res.sendStatus(201);
  } catch {
    server500Error(res);
  }
});

router.get('/:id', requireRole['any'], async (req, res) => {
  try {
    const user = await userServices.getById(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.status(200).json({ user });
  } catch (error) {
    server500Error(res);
  }
});

router.get('/', requireRole[roles.admin], async (req, res) => {
  try {
    const dto = {
      username: req.query.username,
      email: req.query.email,
    };
    const users = await userServices.find(dto);
    res.status(200).json({ users });
  } catch (error) {
    server500Error(res);
  }
});

export default router;
