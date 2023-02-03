import * as express from 'express';
import LeaderboardController from '../controller/leaderboardController';

class RouterLearderBoard {
  public route: express.Router;

  constructor() {
    this.route = express.Router();

    this.route.get('/leaderboard/home', LeaderboardController);
  }
}

export default RouterLearderBoard;
