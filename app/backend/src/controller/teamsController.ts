import { Request, Response } from 'express';
import { teamsService, teamsIdService } from '../services/teamsService';

const getAllTeams = async (_req: Request | any, res: Response) => {
  const allTeams = await teamsService();

  return res.status(200).json(allTeams);
};

const getIdTeams = async (req: Request | any, res: Response) => {
  const { id } = req.params;
  const allTeams = await teamsIdService(id);

  return res.status(200).json(allTeams);
};

export { getAllTeams, getIdTeams };
