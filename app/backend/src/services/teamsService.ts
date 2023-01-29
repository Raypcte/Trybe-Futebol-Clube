import Team from '../database/models/Team';

const teamsService = async () => {
  const allTeams = await Team.findAll();
  return allTeams;
};

const teamsIdService = async (id: number) => {
  const allTeams = await Team.findByPk(id);
  return allTeams;
};

export { teamsIdService, teamsService };
