export interface Login {
  email: string;
  password: string;
}

export interface JWT {
  expiresIn: string;
  algorithm: string;
}

export interface User {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
