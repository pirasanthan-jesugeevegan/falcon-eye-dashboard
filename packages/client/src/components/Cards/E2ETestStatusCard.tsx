import React, { useEffect, useState } from 'react'
import { CardContent, Divider, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MainCard from './MainCard'
import SkeletonPopularCard from './Skeleton/PopularCard'
import Row from '../Row'
import { getStatus } from '../../api/get-test-data'
import { gridSpacing } from '../../redux/constants'

const E2ETestStatusCard = ({ isLoading }: { isLoading: boolean }) => {
    const [data, setData] = useState([])
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true)
    const theme = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getStatus()
                setData(result)
                setIsDataLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsDataLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            {isLoading || isDataLoading || !data ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard
                    content={false}
                    sx={{
                        boxShadow: theme.shadows[10],
                        backgroundColor:
                            theme.palette.mode === 'dark' &&
                            theme.palette.dark.dark,
                    }}
                >
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    alignContent="center"
                                    justifyContent="space-between"
                                >
                                    <Grid item>
                                        <Typography variant="h4">
                                            E2E Test Status
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {data?.map((product: ProductsOverviewData) => (
                                    <>
                                        <Row
                                            title={product.name}
                                            data={product}
                                        />
                                        <Divider sx={{ my: 1.5 }} />
                                    </>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    )
}

export default E2ETestStatusCard
