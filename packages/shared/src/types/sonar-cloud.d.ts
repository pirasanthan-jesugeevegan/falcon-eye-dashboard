interface Contributor {
    name: string
    login: string
    avatar: string
}

interface Commit {
    sha: string
    author: {
        name: string
        login?: string
        avatar?: string
    }
    date: string
    message: string
}

interface Status {
    qualityGateStatus: string
    bugs: number
    vulnerabilities: number
    codeSmells: number
}

interface PullRequest {
    key: string
    title: string
    branch: string
    base: string
    status: Status
    analysisDate: string
    url: string
    target: string
    commit: Commit
    contributors: Contributor[]
}

interface SonarCloudData {
    pullRequests: PullRequest[]
}
interface Condition {
    status: string
    metricKey: string
    comparator: string
    periodIndex: number
    errorThreshold: string
    actualValue: string
}

interface Period {
    index: number
    mode: string
    date: string
    parameter: string
}

interface ProjectStatus {
    status: string
    conditions: Condition[]
    periods: Period[]
    ignoredConditions: boolean
}

interface ProjectStatusData {
    projectStatus: ProjectStatus
}
