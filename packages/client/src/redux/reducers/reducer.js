import { combineReducers } from 'redux';

import customizationReducer from './customizationReducer';
import jiraReducer from './jiraReducer';
import { e2eReducer, unitReducer } from './testDataReducer';

const reducer = combineReducers({
  customization: customizationReducer,
  jiraReducer,
  unitReducer,
  e2eReducer
});

export default reducer;
