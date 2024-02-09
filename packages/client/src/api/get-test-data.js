import commonAxios from './Common'

export async function getE2EData(endpoint) {
    try {
        const req = await commonAxios.get(`/api/v1/e2e/${endpoint}`)
        return req.data
    } catch (error) {
        return error
    }
}
export async function getStatus() {
    try {
        const req = await commonAxios.get('/api/v1/e2e/status')
        return req.data
    } catch (error) {
        return error
    }
}
export async function getE2eTotalTest() {
    try {
        const req = await commonAxios.get('/api/v1/e2e/totalTests')
        return req.data
    } catch (error) {
        return error
    }
}
export async function getUnitData(endpoint) {
    try {
        const req = await commonAxios.get(`/api/v1/unit/${endpoint}`)
        return req.data
    } catch (error) {
        return error
    }
}
