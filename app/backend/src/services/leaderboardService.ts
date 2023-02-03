import TeamModel from '../database/models/Team';
import Matches from '../database/models/Match';

const verify = (matches: any[]) => matches.reduce((acc, cur) => {
  if (cur.homeTeamGoals > cur.awayTeamGoals) {
    acc.totalPoints += 3;
    acc.totalVictories += 1;
  } if (cur.awayTeamGoals > cur.homeTeamGoals) {
    acc.totalLosses += 1;
  } if (cur.homeTeamGoals === cur.awayTeamGoals) {
    acc.totalPoints += 1;
    acc.totalDraws += 1;
  }
  acc.goalsFavor += cur.homeTeamGoals;
  acc.goalsOwn += cur.awayTeamGoals;
  return acc;
}, { totalPoints: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0 });

const transform = (i: any, result: any, match: any) => {
  const position = {
    name: i.teamName,
    totalPoints: result.totalPoints,
    totalGames: match.length,
    totalVictories: result.totalVictories,
    totalDraws: result.totalDraws,
    totalLosses: result.totalLosses,
    goalsFavor: result.goalsFavor,
    goalsOwn: result.goalsOwn,
    goalsBalance: (result.goalsFavor - result.goalsOwn),
    efficiency: ((result.totalPoints / (match.length * 3)) * 100).toFixed(2),
  };

  return position;
};

const getLeaderboarder = async () => {
  const leader = await TeamModel.findAll();
  const rating = await Promise.all(leader.map(async (i) => {
    const match: any = await Matches.findAll({
      where: {
        inProgress: false, homeTeamId: Number(i.id),
      },
    });
    const result = verify(match);

    return transform(i, result, match);
  }));

  return rating;
};

export default getLeaderboarder;
