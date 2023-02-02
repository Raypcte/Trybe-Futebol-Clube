import * as express from 'express';
import { getMatches, createMatches, updateMatches } from '../controller/matchesController';
import { validateToken } from '../auth';

class MatchesRouter {
  public route: express.Router;

  constructor() {
    this.route = express.Router();

    this.route.get('/matches', getMatches);
    this.route.post('/matches', validateToken, createMatches);
    this.route.patch('/matches/:id/finish', updateMatches);
  }
}

export default MatchesRouter;
