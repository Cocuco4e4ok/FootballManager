const initialState = {
  leagues: [],
  commands: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LEAGUE_LIST_RESPONSE':
      return { ...state, leagues: action.payload };
    case 'GET_COMMANDS_LIST_RESPONSE':
      return { ...state, commands: action.payload };
    default:
      return state;
  }
};

export default reducer;
