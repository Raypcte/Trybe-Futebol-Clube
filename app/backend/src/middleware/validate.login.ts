import { NextFunction, Request, Response } from 'express';

const MESSAGE_FIELD = 'All fields must be filled';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400)
      .json({ message: MESSAGE_FIELD });
  }

  next();
};

export default validateLogin;
