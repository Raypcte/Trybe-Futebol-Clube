import * as express from 'express';
import getMatches from '../controller/matchesController';

class MatchesRouter {
  public route: express.Router;

  constructor() {
    this.route = express.Router();

    this.route.get('/matches', getMatches);
  }
}

export default MatchesRouter;
