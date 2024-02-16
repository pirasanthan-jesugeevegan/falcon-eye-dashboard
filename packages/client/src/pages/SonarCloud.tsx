import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MainCard from '../components/Cards/MainCard'
import { getPullRequestData } from '../api/get-sonar-cloud-data'
import SonarCloudTable from '../components/Tables/SonarCloudTable'
import { gridSpacing } from '../redux/constants'
import React from 'react'
import { projectToValue } from 'utils/name-converter'

const SonarCloud = ({ title }: { title: string }) => {
    const [isLoading, setLoading] = useState(true)
    const [sonarCloudPullRequest, setSonarCloudPullRequest] = useState<SonarCloudData>({ pullRequests: [] })

    const theme = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const pullRequest = await getPullRequestData(projectToValue(title))
                setSonarCloudPullRequest(pullRequest)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [title])

    return (
        <MainCard title={title} sx={{ boxShadow: theme.shadows[6] }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {isLoading || !sonarCloudPullRequest || sonarCloudPullRequest.pullRequests.length === 0 ? (
                                <div>Loading...</div>
                            ) : (
                                <SonarCloudTable data={sonarCloudPullRequest.pullRequests} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default SonarCloud
