import { Request, Response } from 'express';
import getLeaderboarder from '../services/leaderboardService';

const LeaderboardController = async (_req: Request, res: Response) => {
  const result = await getLeaderboarder();

  return res.status(200).json(result);
};

export default LeaderboardController;
