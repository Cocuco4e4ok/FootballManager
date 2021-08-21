import instance from './instance';

export const getLeaguesList = () => instance.get('/competitions');
export const getLeagueStandings = (id) => instance.get(`/competitions/${id}/matches/`);
export const getComandsList = () => instance.get('/teams');
export const getComandsInfo = (id) => instance.get(`/teams/${id}`);
export const getCommandStandings = (id) => instance.get(`/teams/${id}/matches/`);
