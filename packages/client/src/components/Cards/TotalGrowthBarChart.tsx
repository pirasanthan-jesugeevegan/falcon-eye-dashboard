import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import MainCard from 'components/Cards/MainCard'
import SkeletonTotalGrowthBarChart from 'components/Cards/Skeleton/TotalGrowthBarChart'
import chartData from '../../constants/chart-data/total-growth-bar-chart'
import { gridSpacing } from '../../redux/constants'

const status = [
    {
        value: 'today',
        label: 'Today',
    },
    {
        value: 'month',
        label: 'This Month',
    },
    {
        value: 'year',
        label: 'This Year',
    },
]

const TotalGrowthBarChart = ({ isLoading }: { isLoading: boolean }) => {
    const [value, setValue] = useState('today')
    const theme = useTheme()
    const customization = useSelector((state: any) => state.customization)

    const { navType } = customization
    const { primary } = theme.palette.text
    const darkLight = theme.palette.dark.light
    const grey200 = theme.palette.grey[200]
    const grey500 = theme.palette.grey[500]

    const primaryLight = theme.palette.primary.light
    const primaryDark = theme.palette.primary.dark
    const secondaryMain = theme.palette.secondary.main
    const secondaryLight = theme.palette.secondary.light

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primaryLight, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                        ],
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary],
                    },
                },
            },
            grid: {
                borderColor: grey200,
            },
            tooltip: {
                theme: 'light',
            },
            legend: {
                labels: {
                    colors: grey500,
                },
            },
        }

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData)
        }
    }, [navType, primaryLight, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500])

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Growth</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">$2,324.00</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    )
}

export default TotalGrowthBarChart
