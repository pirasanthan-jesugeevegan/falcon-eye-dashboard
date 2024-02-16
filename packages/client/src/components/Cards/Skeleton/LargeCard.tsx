import { Card, CardContent, Grid } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const LargeCard = () => (
    <Card>
        <CardContent>
            <Grid container direction="column">
                <Grid item>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Skeleton variant="rectangular" width={44} height={44} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" height={30} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
)

export default LargeCard
