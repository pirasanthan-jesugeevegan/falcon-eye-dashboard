interface Status {
    qualityGateStatus: string
    bugs: number
    vulnerabilities: number
    codeSmells: number
}

interface CommitAuthor {
    name: string
    login: string
    avatar: string
}

interface Contributor {
    name: string
    login: string
    avatar: string
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
    commit: {
        sha: string
        author: CommitAuthor
        date: string
        message: string
    }
    contributors: Contributor[]
}
