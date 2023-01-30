import { Request, Response } from 'express';
import getMatchesServices from '../services/matchesService';

const getMatches = async (_req: Request, res: Response) => {
  const matches = await getMatchesServices();
  return res.status(200).json(matches);
};

export default getMatches;
