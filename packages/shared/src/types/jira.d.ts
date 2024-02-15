interface Issue {
    expand: string
    id: string
    self: string
    key: string
    fields: {
        statuscategorychangedate: string
        parent: {
            id: string
            key: string
            self: string
            fields: {
                summary: string
                status: {
                    self: string
                    description: string
                    iconUrl: string
                    name: string
                    id: string
                    statusCategory: {
                        self: string
                        id: number
                        key: string
                        colorName: string
                        name: string
                    }
                }
                priority: {
                    self: string
                    iconUrl: string
                    name: string
                    id: string
                }
                issuetype: {
                    self: string
                    id: string
                    description: string
                    iconUrl: string
                    name: string
                    subtask: boolean
                    hierarchyLevel: number
                }
            }
        }
        customfield_10193: any
        customfield_10194: any
        customfield_10195: any
        customfield_10196: any
        customfield_10197: any
        fixVersions: any[]
        resolution: any
        lastViewed: string
        customfield_10185: any
        customfield_10186: string
        customfield_10187: any
        priority: {
            self: string
            iconUrl: string
            name: string
            id: string
        }
        customfield_10067: any
        labels: any[]
        timeestimate: any
        aggregatetimeoriginalestimate: any
        versions: any[]
        issuelinks: any[]
        assignee: any
        status: {
            self: string
            description: string
            iconUrl: string
            name: string
            id: string
            statusCategory: {
                self: string
                id: number
                key: string
                colorName: string
                name: string
            }
        }
        components: {
            self: string
            id: string
            name: string
            description: string
            ari: string
            metadata: {
                typeId: string
                compassComponentVersion: string
            }
        }[]
        customfield_10203: number
        customfield_10204: any
        customfield_10205: any
        customfield_10206: any
        customfield_10207: any
        aggregatetimeestimate: any
        customfield_10208: any
        creator: {
            self: string
            accountId: string
            avatarUrls: {
                '48x48': string
                '24x24': string
                '16x16': string
                '32x32': string
            }
            displayName: string
            active: boolean
            timeZone: string
            accountType: string
        }
        subtasks: any[]
        customfield_10040: any
        customfield_10041: any
        customfield_10042: any
        reporter: {
            self: string
            accountId: string
            avatarUrls: {
                '48x48': string
                '24x24': string
                '16x16': string
                '32x32': string
            }
            displayName: string
            active: boolean
            timeZone: string
            accountType: string
        }
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
        votes: {
            self: string
            votes: number
            hasVoted: boolean
        }
        issuetype: {
            self: string
            id: string
            description: string
            iconUrl: string
            name: string
            subtask: boolean
            avatarId: number
            hierarchyLevel: number
        }
        timespent: any
        customfield_10271: any
        customfield_10272: any
        project: {
            self: string
            id: string
            key: string
            name: string
            projectTypeKey: string
            simplified: boolean
            avatarUrls: {
                '48x48': string
                '24x24': string
                '16x16': string
                '32x32': string
            }
        }
        customfield_10273: any
        customfield_10032: any
        customfield_10274: any
        customfield_10033: any
        customfield_10034: any
        aggregatetimespent: any
        customfield_10035: any
        customfield_10036: any
        customfield_10037: any
        customfield_10269: any
        customfield_10027: any[]
        customfield_10028: any
        customfield_10029: any
        resolutiondate: any
        workratio: number
        watches: {
            self: string
            watchCount: number
            isWatching: boolean
        }
        created: string
        customfield_10020: any
        customfield_10021: any
        customfield_10022: any
        customfield_10023: any
        customfield_10024: any
        customfield_10025: any
        customfield_10026: any
        customfield_10379: any
        customfield_10016: any
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
        customfield_10014: string
        customfield_10015: any
        customfield_10378: any
        security: any
        customfield_10405: any
        summary: string
        customfield_10240: any
        customfield_10120: any
        customfield_10241: any
        customfield_10121: any
        customfield_10242: any
        customfield_10000: string
        customfield_10001: any
        customfield_10243: any
        customfield_10122: any
        customfield_10244: any
        customfield_10002: any
        customfield_10123: any
        customfield_10124: any
        customfield_10245: any
        customfield_10004: any
        environment: any
        customfield_10239: {
            self: string
            value: string
            id: string
        }
        customfield_10119: any
        duedate: any
    }
}
interface IssueResponse {
    expand: string
    startAt: number
    maxResults: number
    total: number
    issues: Issue[]
}
