interface ReduxState {
    customization: CustomTheme
    e2eReducer: Reducer
    jiraReducer: Reducer
    unitReducer: Reducer
}

interface Action {
    type: string
    id: string
    defaultId: string
    opened: string | array[string]
    theme: string
    fontFamily: string
    borderRadius: number
    payload: {
        customization: object
        issueType: string
        data: array
        lastUpdated: string
    }
}
