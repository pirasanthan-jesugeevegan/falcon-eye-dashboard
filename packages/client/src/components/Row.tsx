import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { Avatar, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React from 'react'
const Row = ({ title, data }: RowProps) => {
    const theme = useTheme()

    if (!data) {
        return null
    }
    const { status, result } = data
    return (
        <Grid container direction="column">
            <Grid item>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    {status.toUpperCase()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '5px',
                                        backgroundColor:
                                            status === 'pass'
                                                ? theme.palette.success.light
                                                : 'orange.dark',
                                        color:
                                            status === 'pass'
                                                ? 'success.dark'
                                                : 'orange.dark',
                                        ml: 2,
                                    }}
                                >
                                    {status === 'pass' ? (
                                        <ThumbUpAltIcon
                                            fontSize="small"
                                            color="inherit"
                                        />
                                    ) : (
                                        <ThumbDownIcon
                                            fontSize="small"
                                            color="inherit"
                                        />
                                    )}
                                </Avatar>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color:
                            status === 'pass' ? 'success.dark' : 'orange.dark',
                    }}
                >
                    {result}
                </Typography>
            </Grid>
        </Grid>
    )
}

Row.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
}

export default Row
