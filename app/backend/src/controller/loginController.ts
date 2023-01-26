import { Request, Response } from 'express';
import { User } from '../interfaces';
import { createToken } from '../auth';
import loginService from '../services/loginService';

const login = async (req: Request | any, res: Response) => {
  const { email, password } = req.body;
  const user: User | null = await loginService({ email, password });
  const token = createToken(user);
  req.token = token;
  req.userId = user?.id;
  return res.status(200).json({ token });
};

export default login;
