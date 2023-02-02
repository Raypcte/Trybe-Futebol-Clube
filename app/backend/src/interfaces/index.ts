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

export interface Match {
  id?: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
