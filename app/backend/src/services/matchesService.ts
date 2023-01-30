import Team from '../database/models/Team';
import Matches from '../database/models/Match';

const getMatchesServices = async () => {
  const matches = await Matches.findAll({
    include: [
      {
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
  });
  return matches;
};

export default getMatchesServices;
