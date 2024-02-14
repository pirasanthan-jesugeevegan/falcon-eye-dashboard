interface Priority {
    self: string
    iconUrl: string
    name: string
    id: string
}

interface StatusCategory {
    self: string
    id: number
    key: string
    colorName: string
    name: string
}

interface Status {
    self: string
    description: string
    iconUrl: string
    name: string
    id: string
    statusCategory: StatusCategory
}

interface Creator {
    self: string
    accountId: string
    avatarUrls: Record<string, string>
    displayName: string
    active: boolean
    timeZone: string
    accountType: string
}

interface Reporter {
    self: string
    accountId: string
    avatarUrls: Record<string, string>
    displayName: string
    active: boolean
    timeZone: string
    accountType: string
}

interface IssueType {
    self: string
    id: string
    description: string
    iconUrl: string
    name: string
    subtask: boolean
    avatarId: number
    hierarchyLevel: number
}

interface StatusCategory {
    self: string
    id: number
    key: string
    colorName: string
    name: string
}

interface Project {
    self: string
    id: string
    key: string
    name: string
    projectTypeKey: string
    simplified: boolean
    avatarUrls: Record<string, string>
}

interface Votes {
    self: string
    votes: number
    hasVoted: boolean
}

interface Watches {
    self: string
    watchCount: number
    isWatching: boolean
}

interface Fields {
    statuscategorychangedate: string
    customfield_10193: any
    customfield_10194: any
    customfield_10195: any
    customfield_10196: any
    customfield_10197: any
    fixVersions: any[]
    resolution: any
    lastViewed: any
    customfield_10185: any
    customfield_10186: string
    customfield_10187: any
    priority: Priority
    customfield_10067: any
    labels: any[]
    timeestimate: any
    aggregatetimeoriginalestimate: any
    versions: any[]
    issuelinks: any[]
    assignee: any
    status: Status
    components: any[]
    customfield_10203: number
    customfield_10204: any
    customfield_10205: any
    customfield_10206: any
    aggregatetimeestimate: any
    customfield_10207: any
    customfield_10208: any
    creator: Creator
    subtasks: any[]
    customfield_10040: any
    customfield_10041: any
    customfield_10042: any
    reporter: Reporter
    aggregateprogress: {
        progress: number
        total: number
    }
    customfield_10202: string
    customfield_10039: any
    progress: {
        progress: number
        total: number
    }
    votes: Votes
    issuetype: IssueType
    timespent: any
    customfield_10271: any
    customfield_10272: any
    customfield_10273: any
    project: Project
    customfield_10274: any
    customfield_10032: any
    customfield_10033: any
    customfield_10034: any
    aggregatetimespent: any
    customfield_10035: any
    customfield_10036: any
    customfield_10037: any
    customfield_10027: any[]
    customfield_10269: any
    customfield_10028: any
    customfield_10029: any
    resolutiondate: any
    workratio: number
    watches: Watches
    created: string
    customfield_10020: any
    customfield_10021: any
    customfield_10022: any
    customfield_10023: any
    customfield_10024: any
    customfield_10025: any
    customfield_10026: any
    customfield_10016: any
    customfield_10379: any
    customfield_10017: any
    customfield_10018: {
        hasEpicLinkFieldDependency: boolean
        showField: boolean
        nonEditableReason: {
            reason: string
            message: string
        }
    }
    customfield_10019: string
    updated: string
    timeoriginalestimate: any
    description: string
    customfield_10010: any
    customfield_10014: any
    customfield_10378: any
    customfield_10015: any
    security: any
    customfield_10405: any
    summary: string
    customfield_10240: any
    customfield_10241: string
    customfield_10120: any
    customfield_10242: string
    customfield_10000: string
    customfield_10121: any
    customfield_10243: string
    customfield_10001: any
    customfield_10122: any
    customfield_10123: any
    customfield_10002: any
    customfield_10244: string
    customfield_10245: string
    customfield_10124: any
    customfield_10004: any
    environment: any
    customfield_10239: any
    customfield_10119: any
    duedate: any
}

interface Issue {
    expand: string
    id: string
    self: string
    key: string
    fields: Fields
}
