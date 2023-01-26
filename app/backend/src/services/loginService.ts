import { Login } from '../interfaces';
import User from '../database/models/User';

const loginService = async ({ email, password }: Login) => {
  const user = await User.findOne({
    where: { email, password },
  });
  return user;
};

export default loginService;
