import React, { useEffect } from 'react'

import { Card, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'

import generateChartData from '../../constants/chart-data/bajaj-area-chart'

const BajajAreaChartCard = ({ testResults }: any) => {
    const theme = useTheme()

    const customization = useSelector((state: any) => state.customization)
    const { navType } = customization

    const orangeDark = theme.palette.secondary.dark

    useEffect(() => {
        const newSupportChart = {
            ...generateChartData(testResults),
            colors: [orangeDark],
            tooltip: {
                theme: 'light',
            },
        }
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart)
    }, [navType, orangeDark, testResults])

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                Bajaj Finery
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                $1839.00
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        10% Profit
                    </Typography>
                </Grid>
            </Grid>
            <Chart {...generateChartData(testResults)} />
        </Card>
    )
}

export default BajajAreaChartCard
