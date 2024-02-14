import { Card, CardContent, Grid } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

import { gridSpacing } from '../../../redux/constants'
import React from 'react'

const JiraTicketSummaryCardSkeleton = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ textAlign: '-webkit-center' }}>
                    <Skeleton variant="circular" height={250} width={250} />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        spacing={gridSpacing}
                    >
                        <Grid item>
                            <Skeleton variant="text" width={50} />
                            <Skeleton
                                variant="rectangular"
                                height={50}
                                width={50}
                            />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="text" width={50} />
                            <Skeleton
                                variant="rectangular"
                                height={50}
                                width={50}
                            />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="text" width={50} />
                            <Skeleton
                                variant="rectangular"
                                height={50}
                                width={50}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
)

export default JiraTicketSummaryCardSkeleton
