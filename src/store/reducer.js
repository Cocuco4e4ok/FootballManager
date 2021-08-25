const initialState = {
  leagues: [],
  commands: [],
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LEAGUE_LIST_RESPONSE':
      return { ...state, leagues: action.payload };
    case 'GET_COMMANDS_LIST_RESPONSE':
      return { ...state, commands: action.payload };
    case 'ERROR':
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

export default reducer;
