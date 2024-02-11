import { getE2EData, getUnitData } from '../../api/get-test-data'

import { GET_E2E, GET_UNIT } from '../actions'

export const retrieveUnitData = (issueType) => async (dispatch, getState) => {
    const unitData = getState().unitReducer[issueType]
    const currentTime = Date.now()

    if (
        !unitData ||
        unitData.length === 0 ||
        currentTime - unitData.lastUpdated > 600000
    ) {
        try {
            const res = await getUnitData(issueType)
            dispatch({
                type: GET_UNIT,
                payload: {
                    issueType,
                    data: res,
                    lastUpdated: currentTime,
                },
            })
            return res
        } catch (err) {
            console.error('Error retrieving data:', err)
            throw err
        }
    }

    return unitData
}

export const retrieveE2EData = (issueType) => async (dispatch, getState) => {
    const e2eData = getState().e2eReducer[issueType]
    const currentTime = Date.now()

    if (
        !e2eData.data ||
        e2eData.data.length === 0 ||
        currentTime - e2eData.lastUpdated > 600000
    ) {
        try {
            const res = await getE2EData(issueType)
            dispatch({
                type: GET_E2E,
                payload: {
                    issueType,
                    data: res,
                    lastUpdated: currentTime,
                },
            })
            return res
        } catch (err) {
            console.error('Error retrieving data:', err)
            throw err
        }
    }

    return e2eData
}
