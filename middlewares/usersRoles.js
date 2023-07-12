import { roles } from '../settings/roles.js';
import { verifyJWT } from '../utils/jwt.js';

const verifyUser = (req) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return false;
  }

  const token = authHeader.split(' ')[1];

  return verifyJWT(token);
};

const verifyRole = (role, req, res, next) => {
  const user = verifyUser(req);
  if (
    user &&
    (user.role === roles.admin || user.role === role || role === 'any')
  ) {
    req.user = user;
    return next();
  }
  return res.status(401).send('You do not have permission to do this action!');
};

const createRoleMiddleware = () => {
  const middlewareFunctions = {};
  for (let key in roles) {
    middlewareFunctions[key] = (...args) => verifyRole(key, ...args);
  }
  middlewareFunctions['any'] = (...args) => verifyRole('any', ...args);
  return middlewareFunctions;
};

export const requireRole = createRoleMiddleware();
