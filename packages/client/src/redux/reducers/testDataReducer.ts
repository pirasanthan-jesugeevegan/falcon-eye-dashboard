import { GET_E2E, GET_UNIT } from '../actions'
import { initialState } from '../constants'

export function e2eReducer(state = initialState, action: Action) {
    const { type, payload } = action

    switch (type) {
        case GET_E2E:
            return {
                ...state,
                [payload.issueType]: {
                    data: [...payload.data],
                    lastUpdated: payload.lastUpdated,
                },
            }
        default:
            return state
    }
}

export function unitReducer(state = initialState, action: Action) {
    const { type, payload } = action

    switch (type) {
        case GET_UNIT:
            return {
                ...state,
                [payload.issueType]: {
                    data: [...payload.data],
                    lastUpdated: payload.lastUpdated,
                },
            }

        default:
            return state
    }
}
