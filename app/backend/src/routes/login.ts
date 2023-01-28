import * as express from 'express';
import login from '../controller/loginController';
import mid from '../middleware/validate.login';

class LoginRoute {
  public route: express.Router;

  constructor() {
    this.route = express.Router();

    this.route.post('/login', mid, login);
  }
}

export default LoginRoute;
