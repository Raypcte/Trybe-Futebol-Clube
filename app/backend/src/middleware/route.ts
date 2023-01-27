import { Router } from 'express';
import loginController from '../controller/loginController';
import validation from './errorValidation';

const route = Router();

route.get(
  '/login/validation',
  loginController.any,
);
route.post(
  '/login',
  validation,
  loginController.any,
);

export default route;
