import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User } from '../interfaces';
import { createToken } from '../auth';
import { loginService, roleService } from '../services/loginService';

const login = async (req: Request | any, res: Response) => {
  const { email, password } = req.body;

  const user: User | null = await loginService(email);

  if (user === null) {
    return res.status(401).json(
      { message: 'Incorrect email or password' },
    );
  }

  const hash = user?.password || '';
  const verifyPassword = bcrypt.compareSync(password, hash);

  if (verifyPassword) {
    const token = createToken(user);
    req.token = token;
    req.userId = user?.id;
    return res.status(200).json({ token });
  }

  return res.status(401).json(
    { message: 'Incorrect email or password' },
  );
};

const verifyRole = async (req: Request | any, res: Response) => {
  const { userId } = req;
  const user: User | null = await roleService(userId);
  return res.status(200).json({
    role: user?.role,
  });
};

export { login, verifyRole };
