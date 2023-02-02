import { Request, Response } from 'express';
import { getMatchesServices, createMatchesServices, finishMatch } from '../services/matchesService';

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

const createMatches = async (req: Request, res: Response) => {
  const { body } = req;
  const matchProgress = await createMatchesServices({ body, inProgress: true });

  return res.status(201).json(matchProgress);
};

const updateMatches = async (req: Request, res: Response) => {
  const { id } = req.params;

  await finishMatch(id);

  return res.status(200).json({ message: 'Finished' });
};

export { getMatches, createMatches, updateMatches };
