interface TestData {
    id: number
    date: string
    pass: number
    fail: number
    skip: number
    report_url: string
    title: string
}
interface UnitTestData {
    id: number
    pull_request: string
    result: UnitTestResult[]
}

interface UnitTestResult {
    id: number
    date: string
    commit: string
    percentage: string
    statement_coverage: string
    function_coverage: string
    branch_coverage: string
    line_coverage: string
    author: string
}
