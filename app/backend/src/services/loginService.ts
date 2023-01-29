import User from '../database/models/User';

const loginService = async (email: string) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const roleService = async (userId: number) => {
  const userResult = await User.findByPk(userId);
  return userResult;
};

export { loginService, roleService };
