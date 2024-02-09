import { GET_JIRA } from '../actions';

const initialState = {
  bugData: [],
  defectData: [],
  securityData: []
};

function jiraReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JIRA:
      return {
        ...state,
        [payload.issueType]: payload.data
      };

    default:
      return state;
  }
}

export default jiraReducer;
