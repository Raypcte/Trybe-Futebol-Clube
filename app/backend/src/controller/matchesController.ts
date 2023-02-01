import { Request, Response } from 'express';
import getMatchesServices from '../services/matchesService';

const getMatches = async (req: Request, res: Response) => {
  const { inProgress }: any = req.query;
  const matches = await getMatchesServices();
  if (inProgress === 'true') {
    const filterMatches = matches.filter((i) => i.inProgress === true);
    return res.status(200).json(filterMatches);
  }
  if (inProgress === 'false') {
    const filterMatches = matches.filter((i) => i.inProgress === false);
    return res.status(200).json(filterMatches);
  }

  return res.status(200).json(matches);
};

export default getMatches;
