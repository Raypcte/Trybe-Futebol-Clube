import { Request, Response } from 'express';
import { teamsIdService } from '../services/teamsService';
import { getMatchesServices, createMatchesServices,
  finishMatch, editMatch } from '../services/matchesService';

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
  if (body.homeTeamId === body.awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  const team1 = await teamsIdService(body.homeTeamId);
  const team2 = await teamsIdService(body.awayTeamId);
  if (!team1 || !team2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  const matchProgress = await createMatchesServices({ ...body, inProgress: true });

  return res.status(201).json(matchProgress);
};

const updateMatches = async (req: Request, res: Response) => {
  const { id } = req.params;

  await finishMatch(id);

  return res.status(200).json({ message: 'Finished' });
};

const updateMatchesId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  await editMatch(id, body);

  return res.status(200).json({ message: 'Finished' });
};

export { getMatches, createMatches, updateMatches, updateMatchesId };
