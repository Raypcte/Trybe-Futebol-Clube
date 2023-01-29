import * as express from 'express';
import { getAllTeams, getIdTeams } from '../controller/teamsController';

class TeamsRoute {
  public route: express.Router;

  constructor() {
    this.route = express.Router();

    this.route.get('/teams/:id', getIdTeams);
    this.route.get('/teams', getAllTeams);
  }
}

export default TeamsRoute;
