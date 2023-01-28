import * as express from 'express';
import { login, verifyRole } from '../controller/loginController';
import mid from '../middleware/validate.login';
import { validateToken } from '../auth';

class LoginRoute {
  public route: express.Router;

  constructor() {
    this.route = express.Router();

    this.route.get('/login/validate', validateToken, verifyRole);
    this.route.post('/login', mid, login);
  }
}

export default LoginRoute;
