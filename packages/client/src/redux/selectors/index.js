import { createSelector } from 'reselect';

const jiraReducerSelector = (state) => state.jiraReducer;
const unitReducerSelector = (state) => state.unitReducer;
const e2eReducerSelector = (state) => state.e2eReducer;

export const getJiraBugData = createSelector([jiraReducerSelector], (jiraReducer) => jiraReducer.bugData);
export const getJiraDefectData = createSelector([jiraReducerSelector], (jiraReducer) => jiraReducer.defectData);
export const getJiraSecurityData = createSelector([jiraReducerSelector], (jiraReducer) => jiraReducer.securityData);

export const getProductUnitData = (issueType) => createSelector([unitReducerSelector], (unitReducer) => unitReducer[issueType]);
export const getProductE2EData = (issueType) => createSelector([e2eReducerSelector], (e2eReducer) => e2eReducer[issueType]);
