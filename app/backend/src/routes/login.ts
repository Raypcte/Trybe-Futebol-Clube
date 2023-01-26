import * as express from 'express';
import login from '../controller/loginController';

class LoginRoute {
  public route: express.Router;

  constructor() {
    this.route = express.Router();

    this.route.post('/login', login);
  }
}

export default LoginRoute;
