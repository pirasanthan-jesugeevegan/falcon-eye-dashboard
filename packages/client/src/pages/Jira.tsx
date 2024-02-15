import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import MainCard from '../components/Cards/MainCard'
import JiraTable from '../components/Tables/JiraTable'
import { gridSpacing } from '../redux/constants'
import {
    getJiraBugData,
    getJiraDefectData,
    getJiraSecurityData,
} from '../redux/selectors'
import { retrieveJiraData } from '../redux/thunks/jira'

const Products = ({ title }: { title: string }) => {
    const jiraBugData = useSelector(getJiraBugData)
    const jiraDefectData = useSelector(getJiraDefectData)
    const jiraSecurityData = useSelector(getJiraSecurityData)

    const [bug, setBug] = useState<IssueResponse>(jiraBugData)
    const [defect, setDefect] = useState<IssueResponse>(jiraDefectData)
    const [security, setSecurity] = useState<IssueResponse>(jiraSecurityData)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>([])

    const dispatch = useDispatch()
    const theme = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

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
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [dispatch, jiraBugData, jiraDefectData, jiraSecurityData])

    useEffect(() => {
        if (title === 'Bugs') setData(bug || [])
        if (title === 'Defects') setData(defect || [])
        if (title === 'Securitys') setData(security || [])
    }, [bug, defect, security, title])

    return (
        <>
            {data?.issues?.length > 0 ? (
                <MainCard
                    title={`List of Open ${title} issues`}
                    sx={{ boxShadow: theme.shadows[6] }}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <JiraTable data={data.issues} />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            ) : (
                <MainCard sx={{ boxShadow: theme.shadows[6] }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        No Data
                    </Typography>
                </MainCard>
            )}
        </>
    )
}

export default Products
