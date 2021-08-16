import types from './types';

export const GETLeagueListTabResponse = (value) => ({
  type: types.GET_LEAGUE_LIST_RESPONSE, payload: value,
});

export const GETCommandsListTabResponse = (value) => ({
  type: types.GET_COMMANDS_LIST_RESPONSE, payload: value,
});
