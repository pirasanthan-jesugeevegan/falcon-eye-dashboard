import React, { useEffect, useState } from 'react'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import SupportIcon from '@mui/icons-material/Support'
import { Grid } from '@mui/material'
import { IconBug, IconHeadphones, IconShieldLock, IconTicket } from '@tabler/icons'
import { useDispatch, useSelector } from 'react-redux'
// import { OverviewTraffic } from 'components/Charts/PieChat';
// import TotalOrderLineChartCard from '../components/Cards/TotalOrderLineChartCard';
// import TotalGrowthBarChart from '../components/Cards/TotalGrowthBarChart';
import { getProjectStatusData } from '../api/get-sonar-cloud-data'
import { getE2eTotalTest } from '../api/get-test-data'
// import BajajAreaChartCard from '../components/Cards/BajajAreaChartCard';
import PopularCard from '../components/Cards/E2ETestStatusCard'
import LargeCard from '../components/Cards/LargeCard'
import SmallCard from '../components/Cards/SmallCard'
import { gridSpacing } from '../redux/constants'
import { getJiraBugData, getJiraDefectData, getJiraSecurityData } from '../redux/selectors'
import { retrieveJiraData } from '../redux/thunks/jira'

const Dashboard = () => {
    const dispatch = useDispatch()

    const jiraBugData = useSelector(getJiraBugData)
    const jiraDefectData = useSelector(getJiraDefectData)
    const jiraSecurityData = useSelector(getJiraSecurityData)

    const [bug, setBug] = useState<IssueResponse>(jiraBugData)
    const [defect, setDefect] = useState<IssueResponse>(jiraDefectData)
    const [security, setSecurity] = useState<IssueResponse>(jiraSecurityData)
    const [data, setData] = useState<any>([])
    const [b2b2cSonarCloudStatusData, setB2b2cSonarCloudStatusData] = useState<ProjectStatusData | []>([])
    const [txmSonarCloudStatusData, setTxmSonarCloudStatusData] = useState<ProjectStatusData | []>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const result = await getE2eTotalTest()

                if (!jiraBugData || jiraBugData.length === 0) {
                    // @ts-ignore
                    setBug(await dispatch(retrieveJiraData('bug')))
                }
                if (!jiraDefectData || jiraDefectData.length === 0) {
                    setDefect(
                        // @ts-ignore
                        await dispatch(retrieveJiraData('customer defect'))
                    )
                }

                if (!jiraSecurityData || jiraSecurityData.length === 0) {
                    setSecurity(
                        // @ts-ignore
                        await dispatch(retrieveJiraData('security issue'))
                    )
                }

                const b2b2cSonarCloudStatus = await getProjectStatusData('coincover_coincover-b2b2c')
                const txmSonarCloudStatus = await getProjectStatusData('coincover_coincover-txm')

                setData(result)

                setB2b2cSonarCloudStatusData(b2b2cSonarCloudStatus)
                setTxmSonarCloudStatusData(txmSonarCloudStatus)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [dispatch, jiraBugData, jiraDefectData, jiraSecurityData])

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <Grid sx={{ padding: '8px' }}>
                            <LargeCard
                                isLoading={isLoading}
                                title={data.totalTests}
                                subtitle="Total E2E Tests"
                                icon={IconTicket}
                                backgroundColor="primary"
                            />
                        </Grid>
                        <Grid sx={{ padding: '8px' }}>
                            <LargeCard
                                isLoading={isLoading}
                                title={`${bug?.total} Bugs`}
                                subtitle="Total Number of open Defects"
                                icon={IconBug}
                                backgroundColor="secondary"
                            />
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <Grid sx={{ padding: '8px' }}>
                            <LargeCard
                                isLoading={isLoading}
                                title={`${defect?.total} Defects`}
                                subtitle="Total Number of open Defect"
                                icon={IconHeadphones}
                                backgroundColor="secondary"
                            />
                        </Grid>
                        <Grid sx={{ padding: '8px' }}>
                            <LargeCard
                                isLoading={isLoading}
                                title={`${security?.total} Security Issue`}
                                subtitle="Total Number of open Security Issues"
                                icon={IconShieldLock}
                                backgroundColor="primary"
                            />
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        {/* <Grid sx={{ padding: '8px' }}>
              <OverviewTraffic
                chartSeries={[bug?.total, defect?.total, security?.total]}
                labels={['Bugs', 'Defects', 'Security']}
                sx={{ height: '100%' }}
              />
            </Grid> */}

                        <Grid sx={{ padding: '8px' }}>
                            <SmallCard
                                isLoading={isLoading}
                                title="coincover-b2b2c"
                                subtitle="SonarCloud"
                                result={Array.isArray(b2b2cSonarCloudStatusData) ? null : b2b2cSonarCloudStatusData.projectStatus?.status}
                                icon={<FingerprintIcon fontSize="inherit" />}
                            />
                        </Grid>
                        <Grid sx={{ padding: '8px' }}>
                            <SmallCard
                                isLoading={isLoading}
                                title="coincover-txm"
                                subtitle="SonarCloud"
                                result={Array.isArray(txmSonarCloudStatusData) ? null : txmSonarCloudStatusData.projectStatus?.status}
                                icon={<SupportIcon fontSize="inherit" />}
                            />
                        </Grid>
                        <Grid sx={{ padding: '8px' }}>
                            <PopularCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard
