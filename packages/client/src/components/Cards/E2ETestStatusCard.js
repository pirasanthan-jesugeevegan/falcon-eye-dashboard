import { useEffect, useState } from 'react'

import { CardContent, Divider, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'

import MainCard from '../../components/Cards/MainCard'
import SkeletonPopularCard from '../../components/Cards/Skeleton/PopularCard'
import Row from '../../components/Row'

import { getStatus } from '../../api/get-test-data'
import { gridSpacing } from '../../redux/constants'

const E2ETestStatusCard = ({ isLoading }) => {
    const [data, setData] = useState([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    const theme = useTheme()
    console.log(data)
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
                                {data?.map((product) => (
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

E2ETestStatusCard.propTypes = {
    isLoading: PropTypes.bool,
}

export default E2ETestStatusCard
