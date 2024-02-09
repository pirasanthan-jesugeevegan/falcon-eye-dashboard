import commonAxios from './Common'

export async function getPullRequestData(project) {
    try {
        const req = await commonAxios.get(
            `/api/project_pull_requests/list?project=${project}`
        )
        return req.data
    } catch (error) {
        return error
    }
}
export async function getProjectStatusData(project) {
    try {
        const req = await commonAxios.get(
            `/api/qualitygates/project_status?projectKey=${project}`
        )
        return req.data
    } catch (error) {
        return error
    }
}
