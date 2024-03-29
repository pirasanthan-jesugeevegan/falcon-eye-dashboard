import { createSelector } from 'reselect'

const jiraReducerSelector = (state: { jiraReducer: any }) => state.jiraReducer
const unitReducerSelector = (state: { unitReducer: any }) => state.unitReducer
const e2eReducerSelector = (state: { e2eReducer: any }) => state.e2eReducer

export const getJiraBugData = createSelector([jiraReducerSelector], (jiraReducer) => jiraReducer.bugData)
export const getJiraDefectData = createSelector([jiraReducerSelector], (jiraReducer) => jiraReducer.defectData)
export const getJiraSecurityData = createSelector([jiraReducerSelector], (jiraReducer) => jiraReducer.securityData)

export const getProductUnitData = (issueType: string) => createSelector([unitReducerSelector], (unitReducer) => unitReducer[issueType])
export const getProductE2EData = (issueType: string) => createSelector([e2eReducerSelector], (e2eReducer) => e2eReducer[issueType])
