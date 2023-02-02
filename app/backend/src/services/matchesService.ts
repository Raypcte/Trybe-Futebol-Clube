import Team from '../database/models/Team';
import Matches from '../database/models/Match';
import { Match } from '../interfaces';

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

const createMatchesServices = async (body: Match | any) => {
  const resultMatch = await Matches.create(body);

  return resultMatch;
};

//   const mat1 =  async () => {
//     const endMatch = await this.model.update()};

// };

export { getMatchesServices, createMatchesServices };
